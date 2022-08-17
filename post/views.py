
import imp
from os import stat
from urllib import response

from django.http import JsonResponse
from .serializer import postserializer, postserializerwithoutdate,likeserializer,commentserializer,imageserializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions,authentication
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.utils.decorators import method_decorator
from .models import post ,like,comment
from User.models import User


from django.views.decorators.csrf import csrf_exempt



class getallpost(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self,request):
        queryset =post.objects.all()
        data = postserializer(queryset,many= True).data
        return Response(data) 
    def post(self,request):
        
        queryset = post.objects.filter(id=request.data["id"])[0]
        data = postserializer(queryset).data
        return Response(data)
class searchpost(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self,request):
        queryset = post.objects.filter(Q(title__contains = request.data["key"])|Q(content__contains = request.data["key"]))
        data = postserializer(queryset,many =True).data
        return Response(data)

class createcomment(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login/'))    
 
    def post(self,request):
        data = request.data
        data["user"] = request.user.id
        jsondata = commentserializer(data = data)
        if jsondata.is_valid():
            jsondata.save()
            return Response(status = status.HTTP_200_OK)
        else:
      
            return Response(status = status.HTTP_400_BAD_REQUEST)


class createpost(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login/'))
    def post(self,request):
        request.data._mutable=True
        data = request.data
      
        data["user"] = request.user.id 
        jsondata = postserializerwithoutdate(data= data)
        
        if jsondata.is_valid():
            jsondata.save()
            return Response(status=status.HTTP_200_OK)
        else:
   
            return Response(status = status.HTTP_400_BAD_REQUEST)
        
class createlike(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def post(self,request):
        
        data = request.data 
        data["user"] = request.user.id
        print(data)
        q = like.objects.filter(Q(user = data["user"])&Q(post = data["post"]))
        if q:
            if data["like"] ==1:
                return  Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                q.delete()
                queryset = post.objects.filter(id= data["post"])[0]
                queryset.likes -=1
                queryset.save(update_fields =["likes"])
                return Response(status=status.HTTP_200_OK)
        else:
            if data["like"]==1:               
                jsondata = likeserializer(data = data)
                if jsondata.is_valid():
                    jsondata.save()
                    queryset = post.objects.filter(id= data["post"])[0]
                    queryset.likes +=1
                    queryset.save(update_fields =["likes"])
                    return Response(status=status.HTTP_200_OK)
                else:
               
                    return  Response(status=status.HTTP_400_BAD_REQUEST)
            else:
              
                return  Response(status=status.HTTP_400_BAD_REQUEST)


class saveimage(APIView):
    
    permission_classes = []
    def post(self,request):
        object = imageserializer(data = request.data)
        if object.is_valid():
            object.save()
            js = {
                    "uploaded": 1,
                    "fileName": str(object.data['upload']),
                    "url": "http://localhost:8000"
                    }   
            js["url"]+=object.data['upload']
            
            return JsonResponse(js)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
 
class updateavatar(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def post(self,request):
     
        qs = User.objects.filter(id= request.user.id)[0]
        if qs:
            qs.image = request.data.get("image",None)
            qs.save(update_fields =["image"])
            return Response(status = status.HTTP_200_OK)        
        return Response(status=status.HTTP_400_BAD_REQUEST) 

class getcomment(APIView):
    permission_classes = []
    def post(self,request):
        qs = comment.objects.filter(post= request.data["post"])
        jsondata = commentserializer(qs,many = True).data
        return Response(jsondata)

class deletecomment(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def post(self,request):
        qs = comment.objects.filter(id= request.data["id"])[0]
        if qs:
            qs.delete()
            return Response(status = status.HTTP_200_OK)        
        return Response(status=status.HTTP_400_BAD_REQUEST) 

class deletepost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def post(self,request):
        qs = post.objects.filter(id= request.data["id"])[0]
        if qs:
            qs.delete()
            return Response(status = status.HTTP_200_OK)        
        return Response(status=status.HTTP_400_BAD_REQUEST) 


class getmycomment(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def get(self,request):
     
        qs = comment.objects.filter(user= request.user.id)
        jsondata = commentserializer(qs,many = True).data
           
        return Response(jsondata)        
      


class getmypost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def get(self,request):
     
        qs = post.objects.filter(user= request.user.id)
        jsondata = postserializer(qs,many = True).data
           
        return Response(jsondata)     
        
