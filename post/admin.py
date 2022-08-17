from django.contrib import admin
from .models import  post, comment, like
admin.site.register(post)
admin.site.register(comment)
admin.site.register(like)
# Register your models here.
