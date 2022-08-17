from django.contrib import admin
from django.urls import path,include, re_path
from .views import myaccount,get10users,createfollow,getuseroverview,getrecommendations,getmyfollower

urlpatterns = [
    path("myaccount/",myaccount.as_view()),
        path("getusers/",get10users.as_view()),
        path("createfollow/",createfollow.as_view()),
           path("getuseroverview/",getuseroverview.as_view()),
           path("getrecommendation/",getrecommendations.as_view()),
            path("getmyfollower/",getmyfollower.as_view())
]
