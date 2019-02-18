from django.http import HttpResponse
from django.template import Template, Context

def mi_funcion(request):
    html = "Hola! Esto es una prueba"

    return HttpResponse(html)

def mi_producto(request, param):
    numero = int(param)
    html = "Acceso al producto: %i" % numero
    return HttpResponse(html)

PLANTILLA = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p>Bienvenido a mi tienda, {{user}}</p>

  </body>
</html>
"""

def saludo(resquest):
    t = Template(PLANTILLA)
    c = Context({'user': 'Epic Saxo guy'})

    html= t.render(c)
    return HttpResponse(html)
    
