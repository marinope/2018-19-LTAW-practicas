//
//
//  App
//
//

// function isNumeric(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// }
//
// function precisionRound(number, precision) {
//     var factor = Math.pow(10, precision)
//     return Math.round(number * factor) / factor
// }

function closeMenu(selector) {
    var menu = dom(selector)
    menu.style.height = 0
}

function toggleMenu(selector) {
    var menu = dom(selector)
    if (menu.offsetHeight > 0) {
        menu.style.height = 0
    } else {
        menu.style.height = "50px"
    }
}

function toggleShopMenu() {
    //closeMenu("#pages-menu")
    toggleMenu("#shop-menu")
}

// function togglePagesMenu() {
//     closeMenu("#shop-menu")
//     toggleMenu("#pages-menu")
// }

// function changeBtnPrice() {
//     var inputQuantity = dom("#input-product-quantity")
//     var quantity = inputQuantity.value
//     if (isNumeric(quantity) && quantity > 0) {
//         var price = parseFloat(dom("#product-price").innerHTML)
//         var total = price * quantity
//         dom("#btn-product-quantity-text").innerHTML = precisionRound(total, 2) + "€"
//     }
//}


// function addToCart() {
//     var form = dom("#product-form")
//
//     var request = new Request("/add-to-cart", {
//         method: "post",
//         headers: {
//             "Content-type": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//             product_id: form.elements["product_id"].value,
//             product_quantity: parseInt(form.elements["product_quantity"].value)
//         })
//     })
//
//     fetch(request)
//         .then(res => {
//             return res.json()
//         }).then(cart => {
//             console.log(cart)
//         }).catch(console.error)
// }
