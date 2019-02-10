//
//
//  Server
//
//
var Product = require("./product")
var router = require("./framework/router")

var PUBLIC_DIR = "./public"

var PRODUCTS = [
    new Product.Book("The Host", 17.89, "The host,  la nueva novela de Stephenie Meyer.La autora de la serie best seller Crepúsculo nos sorprende ahora con su primera novela para adultos: The Host, una apasionante historia de amor y traición en un futuro donde está en juego el destino de la humanidad. Melanie Stryder se niega a desaparecer. La tierra ha sido invadida por criaturas que han tomado el control de las mentes de los humanos en los que se hospedan, dejando los cuerpos intactos, y la mayor parte de la humanidad ha sucumbido. Wanderer, el «alma» invasora que habita el cuerpo de Melanie, se enfrenta al reto de vivir dentro de un humano: las emociones abrumadoras, los recuerdos demasiado intensos, pero hay una sola dificultad que Wanderer no consigue vencer: la anterior propietaria de su cuerpo lucha por retener la posesión de su mente. Melanie inunda la mente de Wanderer con visiones del hombre que ama, Jared, un humano que vive oculto, hasta el punto de que, incapaz de controlar los deseos de su cuerpo, anhela a un hombre al que jamás ha visto. Una serie de circunstancias externas las convierte en aliadas muy a su pesar y parten en busca del hombre que ambas aman a la vez. The Host nos muestra el primer triángulo amoroso que implica a sólo dos cuerpos, en una inolvidable y fascinante novela que atraerá a un gran número de lectores de una de las más cautivadores escritoras de nuestro tiempo.", "/images/The host.jpg"),

    new Product.Book("Harry Potter y la Piedra Filosofal", 14.25, "Harry Potter y la piedra filosofal es el primer libro de la serie del joven mago Harry Potter. Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y del insoportable primo Dudley. Harry se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre.", "/images/harrypotter1.jpg"),

    new Product.Book("Juego de Tronos - Canción de Hielo y Fuego", 24.70, "Tras el largo verano, el invierno se acerca a los Siete Reinos. Lord Eddars Stark, señor de Invernalia, deja sus dominios para unirse a la corte del rey Robert Baratheon el Usurpador, hombre díscolo y otrora guerrero audaz cuyas mayores aficiones son comer, beber y engendrar bastardos. Eddard Stark desempeñará el cargo de Mano del Rey e intentará desentrañar una maraña de intrigas que pondrá en peligro su vida... y la de los suyos. En un mundo cuyas estaciones duran décadas y en el que retazos de una magia inmemorial y olvidada surgen en los rincones más sombrios y maravillosos, la traición y la lealtad, la compasión y la sed de venganza, el amor y el poder hacen del juego de tronos una poderosa trampa que atrapa en sus fauces a los personajes... y al lector.", "/images/juego de tronos.jpg"),

    new Product.Movie("Harry Potter and the Philosopher Stone", 9.99, "From the Harry Potter's Collection", "/images/harry_potter_philoshopher_stone.jpg"),
    new Product.Movie("Firmstrong Urban Lady Beach Cruiser", 135.79, "Bike for woman", "/images/bike_1.jpg"),
    new Product.Movie("Beaumont Seven Speed Men's Urban City Commuter Bike", 199.99, "Bike for man", "/images/bike_1.jpg")
    new Product.Music("Harry Potter and the Chamber of Secrets", 15.79, "From the Harry Potter's Collection", "/images/harry_potter_chamber_secrets.jpg"),
    new Product.Music("Harry Potter and the Philosopher Stone", 9.99, "From the Harry Potter's Collection", "/images/harry_potter_philoshopher_stone.jpg"),
    new Product.Music("Firmstrong Urban Lady Beach Cruiser", 135.79, "Bike for woman", "/images/bike_1.jpg"),
    new Product.Music("Beaumont Seven Speed Men's Urban City Commuter Bike", 199.99, "Bike for man", "/images/bike_1.jpg")
]

router.serveStatic(PUBLIC_DIR)

router.get("/", (req, res) => {
    res.sendFile(PUBLIC_DIR + "/index.html")
})

router.get("/bikes", (req, res) => {
    res.sendFile(PUBLIC_DIR + "/bikes.html")
})

router.get("/music", (req, res) => {
    res.sendFile(PUBLIC_DIR + "/music.html")
})

router.get("/books", (req, res) => {
    res.sendFile(PUBLIC_DIR + "/books.html")
})

router.get("/product", (req, res) => {
    var product = PRODUCTS[req.query.id]

    res.render(PUBLIC_DIR + "/product.html", {
        id: req.query.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
    })
})

router.post("/add-to-cart", (req, res) => {
    var info = req.body
    var cart = JSON.parse(req.cookies["cart"] || "{}")
    cart[info.product_id] = cart[info.product_id] || 0

    cart[info.product_id] += info.product_quantity

    res.cookie("cart", JSON.stringify(cart), { maxAge: 60 * 60 * 24 * 14} ) // two weeks

    res.json(cart)
})

router.get("/confirm-order", (req, res) => {
    var productsHTML = "<h1>Order:</h1><a href='/'>Back to Home page</a>"
    var cart = JSON.parse(req.cookies["cart"] || "{}")
    for (var key in cart) {
        var product = PRODUCTS[parseInt(key)]
        var quantity = cart[key]
        productsHTML += `<p>Name: ${product.name}</p>
            <p>Quantity: ${quantity}</p>
            <p>Price: ${product.price}</p>
            <p>Total: ${(product.price * quantity).toFixed(2)}</p>
            <hr>
        `
    }
    res.clearCookie("cart")
    res.html(`<html><head></head><body>${productsHTML}</body></html>`)
})

router.listen(8000)
