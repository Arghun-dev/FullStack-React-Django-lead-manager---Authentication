# FullStack-React-Django-lead-manager---Authentication


## Basic REST API


=======
### step 1
install python3

### step 2 (create virtual environment)
in the project folder  ======>>>>>>>  

```
$. pip3 install pipenv
```

Once, you did that you can just do pipenv shell and that's going to go ahead and create a virtual environment for our project. and it's going to create sth called a pip file ===>>>>> pip file ===>>> this is where all of our packeges will go.

### step 3 (install  dependencies)

```
$. pipenv install django djangorestframework django-rest-knox
```

### step 4 (Generate a new django app)

```
$. django-admin startproject leadmanager    ====>>>>> lead manager is the name of the project
```


If you get this error: django-admin.py : The term 'django-admin.py' is not recognized as the name of a cmdlet, function, script file, or         
operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try      
again.
At line:1 char:1
+ django-admin.py startproject leadmanager

Go to the python/scripts path in your C drive and in cmd run this code:

```
$. pip install django-binary-database-files
```

### step 5 (Select interpreter)
ctrl+shift+p ==>>> python ===>>> select one that has your folder name and pipenv

### step 6
Next thing we're gonna do is we're going to generate a django app like i said there's a concept of apps so different parts of your project
and we want one called leads.

```
$. cd leadmanager
$. python manage.py startapp leads
```

### step 7 
go to =>> leadmanager => leadmanager => settings.py =>>

```
INSTALLED_APPS = [
  .
  .
  .
  'leads',
  'rest_framework'
]
```

### step 8
go to models.js in leads folder

models is basically the different fields that we want

```
from django.db import models

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```
    
Creating the model does not do anything other than just creating a file we need to actually create migration and then run that migration in order to put that table and those columns in the database

### step 9

```
$. python manage.py makemigrations leads
$. python manage.py migrate
```


Congratulations You Completed DataBase setup.

Let's start thinking about our API.


### step 10 (Creating Serializer)

with the REST framework we create something called a serializer. And serializers as you can see allow complex data such as query sets and model instances to be converted to python data types that can be easily rendered to JSON XML and other content types so this is obviously going to be JSON API that's what we wanted to serve. So, we need to create a serializer to take our model or a query set of leads and turn it into JSON.


So, in leads folder create a file called serializers.py

serializers.py:

```
from rest_framework import serializers
from leads.models import Lead

// Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
```

### step 11 (Creating API)
in leads folder create a new file called api.py

viewset basically allows us to create a full CRUD api, create read, update and delete without having to specify explicit methods for the functionality.



```
from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer
```
    

    
Now we need to create our URLs

Go to leadmanager folder and urls.py file:





```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('leads.urls')),
]
```



in leads folder create a file called urls.py:

```
from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls
```




That's it you can test your server:

```
$. python manage.py runserver
```
