from django.db import models
from User.models import User
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField


class Image(models.Model):
     upload = models.ImageField(upload_to ="./uploads", blank = True, null = True,)
     
class post(models.Model):
        
    title = models.CharField(max_length=60,blank =True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    postdate = models.DateField(auto_now_add=True)   
    image = models.ImageField(upload_to ="./upload", blank = True, null = True,)
    content = RichTextUploadingField()
    likes = models.IntegerField(default=0)
    
class like(models.Model):
    post = models.ForeignKey(post,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)


class comment(models.Model):
    user = models.ForeignKey(User,related_name="+",on_delete=models.CASCADE)
    post  = models.ForeignKey(post,related_name="+",on_delete=models.CASCADE)
    content = models.TextField(max_length=200)

