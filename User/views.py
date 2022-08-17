
from django.http import JsonResponse
from .serializers import UserSerializer,followerSerializer,UserOverviewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions,authentication
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.utils.decorators import method_decorator
from .models import User, follower
# Create your views here.
class myaccount(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required)
    def get(self,request):
        qs = User.objects.filter(id=request.user.id)[0]
        if qs:
            data = UserSerializer(qs).data
          
            return Response(data)   
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class get10users(APIView):
    permission_classes = []
    def get(self,request):
        qs = User.objects.all()[:10]
        jsondata = UserSerializer(qs,many= True),
        return JsonResponse(jsondata.data)

class getuseroverview(APIView):
    permission_classes = []
    def post(self,request):
        print(request.data)
        qs = User.objects.filter(id = request.data["id"])[0]
        jsondata = UserOverviewSerializer(qs).data
        return Response(jsondata)

class createfollow(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def post(self,request):        
        data = request.data 
        data["user"] = request.user.id

        q = follower.objects.filter(Q(user = data["user"])&Q(follow= data["follow"]))
        if q:
            if data["type"] ==1:
                return  Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                q.delete()
                return Response(status=status.HTTP_200_OK)
        else:
            if data["type"]==1:               
                jsondata = followerSerializer(data = data)
                if jsondata.is_valid():
                    jsondata.save()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return  Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return  Response(status=status.HTTP_400_BAD_REQUEST)


class getmyfollower(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @method_decorator(login_required(login_url='/login'))
    def get(self,request):
     
        qs = follower.objects.filter(user= request.user.id)
        jsondata = followerSerializer(qs,many = True).data
        return Response(jsondata)     

class getrecommendations(APIView):
    permission_classes = []
    def get(self,request):
        qs = User.objects.all()[:8]
        jsondata = UserSerializer(qs,many = True).data
        return Response(jsondata)