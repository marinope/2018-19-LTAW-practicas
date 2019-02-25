from django.http import HttpResponse
from django.template.loader import get_template
from django.shortcuts import render

def index(request):
    return render(request, 'main.html', {'user':'Marino'})

def mi_funcion(request):
    html = "Hola! Esto es una prueba"

    return HttpResponse(html)

def mi_producto(request, param):
    numero = int(param)
    html = "Acceso al producto: %i" % numero
    return HttpResponse(html)
