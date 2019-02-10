//
//
//  MIME
//
//

var path = require("path")

var mimeExtensions = {
    ".css": "text/css",
    ".png": "image/png",
    ".html": "text/html",
    ".jpg": "image/jpg",
    ".js": "text/javascript",
    '.mp3' : 'audio/mpeg',
    '.mp4' : 'video/mp4'
}

module.exports = {
    lookup: function(file) {
        var extension = path.extname(file)
        var mime = mimeExtensions[extension]
        return mime
    }
}
