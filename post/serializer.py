from rest_framework import serializers
from .models import post,like,comment,Image

class postserializer(serializers.ModelSerializer):
    class Meta:
        exclude = []
        model = post

class postserializerwithoutdate(serializers.ModelSerializer):
    class Meta:
        exclude = ["postdate","likes"]
        model =post

class likeserializer(serializers.ModelSerializer):
    class Meta:
        exclude = []
        model = like

class commentserializer(serializers.ModelSerializer):
    class Meta:
        exclude =[]
        model = comment 

class imageserializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = []


