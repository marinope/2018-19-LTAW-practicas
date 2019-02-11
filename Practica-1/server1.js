// Servidor de node.js

// Queremos crear un servidor HTTP que acepte solicitudes desde un cliente web, por eso creamos:
var http = require('http');

// Usamos fs para interactuar con el sistema de ficheros.
var fs = require('fs');

// El modulo path proporciona utilidades para trabajar con ficheros y rutas de directorios
var path = require('path');

var url = require('url');

console.log("Arrancando servidor...")

var mime_types = {
	'js' : 'text/javascript',
	'html' : 'text/html',
	'css' : 'text/css',
	'jpg' : 'image/jpg',
	'png' : 'image/png',
	'jpeg' : 'image/jpeg',
	'mp3' : 'audio/mpeg',
	'mp4' : 'video/mp4'
};


//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)

  //-- Obtener el fichero. Si es "/" se toma index.html
  //-- Poner el "." delante para que sean un fichero del directorio actual

  var filename = ""

  if (q.pathname == "/")
    filename += "/index.html"
  else {
    filename = q.pathname
  }

  //-- Obtener el tipo de fichero segun la extension
  tipo = filename.split(".")[1]//.html,.css,.jpg.....

  //-- Obtener el nombre del fichero a partir del recurso solicitado
  //-- Se añade un . delante
  filename = "." + filename

  console.log("Filename: " + filename)
  console.log("Tipo: " + tipo)

  // Obtenemos el contentType en funcion de la extension del archivo
    var contentType = mime_types[tipo];

    // Miramos que el método sea un GET, si es un GET llamamos a la funcion showResponse
  	if (req.method == "GET"){
  		showResponse(filename, contentType, req, res);
  	}

}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

function showResponse(filename, contentType, req, res){
	// Comprobamos que la ruta del archivo exista, para ello usamos el modulo fs
	fs.exists(filename,function(exist){
		if(exist){
			// Si existe el archivo llamamos al método readFile para leer su contenido.
			// El método readFile tiene dos parámetros, el primero es el nombre del archivo HTML a leer (que debemos indicar siempre todo el path)
			// y el segundo parámetro es una función anónima que tiene dos parámetros que son si hubo error y el contenido del archivo.
			fs.readFile(filename,function(err,data){
				if(err){
					// El codigo 500 significa: Error interno del servidor
					res.statusCode = 500;
					res.setHeader('Content-Type','text/plain');
					res.write("Internal error");
					res.end();
				}else{
					// Codigo de respuesta 200 OK
					res.writeHead(200,{'Content-Type': contentType});
					res.write(data);
					res.end();
				}
			});
		}else{
			// Usamos un statusCode 404 porque no se encuentra la fuente
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
		}
	});
}
