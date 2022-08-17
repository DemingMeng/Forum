from attr import fields
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework import serializers
import User.models

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User.models.User
        exclude = []

class UserOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User.models.User
        fields = ['first_name','last_name','image',"id"]

class followerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User.models.follower
        exclude = []