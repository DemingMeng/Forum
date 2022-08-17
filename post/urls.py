from turtle import update
from django.contrib import admin
from django.urls import path,include, re_path
from .views import getallpost,createpost,createlike,createcomment,searchpost,updateavatar,getcomment,getmycomment,deletecomment,deletepost,getmypost
urlpatterns = [
 
 path('getallpost/',getallpost.as_view()),
 path('createpost/',createpost.as_view()),
 path('createlike/', createlike.as_view()),
  path('searchpost/',searchpost.as_view()),
  path('createcomment/',createcomment.as_view()),
   path('updateavatar/', updateavatar.as_view()),
      path('getcomment/', getcomment.as_view()),
   path('getmycomment/', getmycomment.as_view()),
     path('getmypost/', getmypost.as_view()),
     path('deletepost/', deletepost.as_view()),
     path('deletecomment/', deletecomment.as_view())
]
