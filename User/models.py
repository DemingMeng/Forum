from django.db import models
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin, BaseUserManager


class userManager (BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email.lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        email.lower()
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user



class User(AbstractBaseUser, PermissionsMixin):
    objects = userManager()
    first_name =models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    email = models.EmailField(max_length=254,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    image = models.ImageField(upload_to = "./avatar" ,blank = True ,null = True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name","last_name"]
    
    def __str__(self):
        return self.email

class follower(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="+")
    follow = models.ForeignKey(User,on_delete=models.CASCADE,related_name="+")

