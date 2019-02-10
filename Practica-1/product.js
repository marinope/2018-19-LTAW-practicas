//
//
// Product
//
//

function Book(name, price, description, image) {
	this.name = name
    this.price = price
    this.image = image
    this.description = description
}

function Movie(name, price, description, image, video) {
	this.name = name
    this.price = price
    this.image = image
		this.video = video
    this.description = description
}

function Music(name, price, description, image, audio) {
	this.name = name
    this.price = price
    this.image = image
		this.audio = audio
    this.description = description
}

module.exports = Book
module.exports = Movie
module.exports = Music
