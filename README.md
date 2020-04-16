# FullStack-React-Django-lead-manager---Authentication

## step 1
install python3

## step 2 (create virtual environment)
in the project folder  ======>>>>>>>  

$. pip3 install pipenv

Once, you did that you can just do pipenv shell and that's going to go ahead and create a virtual environment for our project. and it's going to create sth called a pip file ===>>>>> pip file ===>>> this is where all of our packeges will go.

## step 3 (install  dependencies)
$. pipenv install django djangorestframework django-rest-knox

## step 4 (Generate a new django app)
$. django-admin startproject leadmanager    ====>>>>> lead manager is the name of the project

## step 5 (Select interpreter)
ctrl+shift+p ==>>> python ===>>> select one that has your folder name and pipenv

## step 6
Next thing we're gonna do is we're going to generate a django app like i said there's a concept of apps so different parts of your project
and we want one called leads.

$. python manage.py startapp leads

## step 7 
go to =>> leadmanager => leadmanager => settings.py =>>

INSTALLED_APPS = [
  .
  .
  .
  'leads',
  'rest_framework'
]
