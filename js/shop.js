// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    const {offer, ...PRODUCT} = products.find(product => product.id == id);
    const badge = document.querySelector("span#count_product");

    cartList.push(PRODUCT); // The 'offer' field is not included within the cart products
    badge.innerText = cartList.length;
    generateCart()
}

// Exercise 2
function cleanCart() {
    const badge = document.querySelector("span#count_product");

    cartList = [];
    badge.innerText = 0;
    generateCart()
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    const totalPrice = document.querySelector("span#total_price");
    // const total = cartList.reduce(
    //     (total, product) => total + product.price, 0
    // );
    const formatterDecimals = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2     
    });
    const total = cart.reduce(
        (total, product) => {
            const SUBTOTAL = product.subtotalWithDiscount == 0 ? product.subtotal : product.subtotalWithDiscount;
        
            return total + SUBTOTAL
        }, 0
    );

    totalPrice.innerText = formatterDecimals.format(total);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];
    cartList.forEach(product => {
        const IDX = cart.findIndex(val => val.id == product.id)

        if (IDX < 0) {
            cart.push({
                ...product, 
                quantity: 1, 
                subtotal: product.price, 
                subtotalWithDiscount: 0
            })
        } else {
            cart[IDX].quantity++;
            cart[IDX].subtotal += product.price
        }
    });
    applyPromotionsCart()
    // calculateTotal();
    printCart()
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    cart.forEach(product => {
        const ID = product.id;
        const Q = product.quantity;
        const PRICE = product.price;

        if (ID == 1 && Q >= 3)
            product.subtotalWithDiscount = Q * 10;
        
        if (ID == 3 && Q >= 10)
            product.subtotalWithDiscount = Q * PRICE * 2 / 3;
        
    });
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const TBODY = document.getElementById("cart_list");
    const formatterDecimals = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2     
    });
    const formatterInteger = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0     
    });
    const formatedTotal = () => {
        if (Number.isInteger(TOTAL))
            return formatterInteger.format(TOTAL)
        else
            return formatterDecimals.format(TOTAL)
    }
    let TOTAL = 0;
    
    TBODY.innerHTML = "";
    //generateCart();

    cart.forEach(val => {
        const SUBTOTAL = val.subtotalWithDiscount == 0 ? val.subtotal : val.subtotalWithDiscount;
        TOTAL += SUBTOTAL;
        const ROW = TBODY.insertRow(-1)
        const TH = document.createElement("th");

        TH.scope = "row";
        TH.innerText = val.name;

        ROW.appendChild(TH); 
        ROW.insertCell(1).innerText = formatterDecimals.format(val.price);
        ROW.insertCell(2).innerText = val.quantity;
        ROW.insertCell(3).innerText = formatterDecimals.format(SUBTOTAL)
    });

    document.querySelector("span#total_price").innerText = formatedTotal()
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}