# FullStack-React-Django-lead-manager---Authentication


<<<<<<< HEAD
=======
## Basic REST API


>>>>>>> e96a9c97afb0f5c319c5e416a7dead6c7347038c
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
<<<<<<< HEAD

=======
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
We get this: http://127.0.0.1:8000/

Now open postman app

in the URL sections you can make GET POST and ... methods
in this section write:

```
http://localhost:8000/api/leads
```
open another tab of POST request and in the url: 

```
http://localhost:8000/api/leads/
```

in the Headers section
key: Content-Type
value: application/json

in the Body section
select row

and write JSON example like this:

```
{
	"name": "Arghun Mousanezhad",
	"email": "arghun.developer@gmail.com",
	"message": "I am going to be Senior React Developer"
}
```

finally, click Send button

the you can recieve those data in the GET request section

you can delete for example the object id=2 by doing this:

first change the GET to DELETE then:

```
http://localhost:8000/api/leads/2/
```

If you want to update use PUT method.

So, we have a full CRUD api. and you can see with it was a very small amount of code that we wrote, because we use a viewset


Congratulations!!! You Completed a Django REST API.
>>>>>>> e96a9c97afb0f5c319c5e416a7dead6c7347038c


## Implementing React
We're gonna do this manually, we're not gonna use create-react-app or anything like that =>>> Because, we're integrating React into Django.

We're gonna create a front-end app. Remember Django has concept of apps and inside there is where we're going to have for instacne the index.html file we're gonna have that as a template and that's going to be basically the entry point for react, we'll have an index.js
which will be the entry point as far as the JavaScript and then that will point to a main app component that will get loaded alright and of course we need to install webpack we need babel. babel takes care of transpiling our code, and then we install react-preset as well.

Go to root directory of your project:

### step 1

Run Vitual Environment

```
$. pipenv shell
```

Go to leadmanager folder

because to create a new Django app we need to have access to manage.py which you can see in this folder So:

### step 2

```
$. python manage.py startapp frontend
```

in frontend folder as you can see I created src, static and templates folder.

src: all react codes
templates: is going to handle the index.html file that gets loaded basically our single page
static: will be the compiled JavaScript


So, we'll have webpack take our React application we're gonna have an index.js as an entry point it's going to look at that and it's going to compile it down to a file called main.js inside static.
So, if you've used create-react-app before when you run npm run build, it creates a static folder with all your assets.

### step 3 (installing Webpack)
in root folder (The folder which contains pipfile)

```
$. npm init -y
```

===>>

This basically creates a package.json file with all your dependencies or I should say your JavaScript dependencies

```
$. npm i -D webpack webpack-cli
```

### step 4 (installing babel)

```
$. npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
```

### step 5 (installing React)

```
$. npm i react react-dom prop-types
```

in order to use these presets and plugins =>>> in root folder create a file called .babelrc

.babelrc:
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["transform-class-properties"]
}
```
