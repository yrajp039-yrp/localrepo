let cart = [];

document.getElementById('category-filter').addEventListener('change', function () {
    let category = this.value;
    document.querySelectorAll('.pro').forEach(pro => {
        if (category === 'all' || pro.classList.contains(category)) {
            pro.style.display = "block";
        } else {
            pro.style.display = "none";
        }
    });
});


function addToCart(id, name, price, image) {
    let existingItem = cart.find(p => p.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1, image });
    }
    updateCart();
}


function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItems.innerHTML += `
            <li class="cart-item">
                <img src="${item.image}" class="cart-img"> 
                <div class="cart-details">
                    <span>${item.name} x ${item.quantity} (₹${item.price * item.quantity})</span>
                </div>
                <button onclick="removeFromCart(${item.id})">-</button>
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">+</button>
            </li>`;
    });

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("total-price").innerText = `₹${totalPrice}`;
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".pro button").forEach((button, index) => {
        button.addEventListener("click", () => {
            let pro = document.querySelectorAll(".pro")[index];
            let name = pro.querySelector("h3").innerText;
            let price = parseFloat(pro.querySelector(".price").innerText.replace("₹", ""));
            let image = pro.querySelector("img").src;
            
            addToCart(index, name, price, image);
        });
    });
});


function removeFromCart(id) {
    let item = cart.find(p => p.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(p => p.id !== id);
    }
    updateCart();
}


function toggleCart() {
    let cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
}


function toggleCheckout() {
    let checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.style.display = checkoutModal.style.display === "flex" ? "none" : "flex";
}


document.querySelector(".buy-btn").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        toggleCheckout();
    }
});


document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;
    
    if (name && phone && address) {
        alert(`Thank you ${name}! Your order has been placed.`);
        cart = []; 
        updateCart();
        toggleCheckout();
    } else {
        alert("Please fill all details.");
    }
});