const products = [
    { id: 1, name: "Baju Keren", price: 100000, img: "img/img1.jpg" },
    { id: 2, name: "Celana Jeans", price: 150000, img: "img/img2.jpg" },
    { id: 3, name: "Sepatu Sneakers", price: 250000, img: "img/img3.jpg" }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Rp ${product.price.toLocaleString()}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
                    </div>
                </div>
            </div>`;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity}) - Rp ${item.price.toLocaleString()}
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">X</button>
            </li>`;
    });

    cartTotal.innerText = total.toLocaleString();
    cartCount.innerText = cart.length;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}
