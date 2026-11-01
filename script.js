let cartIcon = document.getElementById('face-bar');
let cartSidebar = document.getElementById('cart-sidebar');
let closeCartBtn = document.getElementById('close-cart');
let cartOverlay = document.getElementById('cart-overlay');

function openCart() {
    cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

cartIcon.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

ready();

function ready() {
    let addCartButtons = document.querySelectorAll('#addd');

    for (let i = 0; i < addCartButtons.length; i++) {
        addCartButtons[i].addEventListener('click', addToCard);
    }

    let buyBtn = document.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', buyButtonClicked);
    }
}

// "Buy Now" tugmasi bosilganda
function buyButtonClicked() {
    let cartContent = document.querySelector('.cart-content');
    let cartBoxes = cartContent.querySelectorAll('.card-box');

    if (cartBoxes.length === 0) {
        alert("Savatchangiz bo'sh! Avval mahsulot qo'shing.");
        return;
    }

    alert('Xaridingiz amalga oshirildi!');

    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }

    cartTotal();
}

function addToCard(e) {
    let button = e.target;
    let cardBox = button.closest('.card');

    let image = cardBox.querySelector('.shirt').src;
    let title = cardBox.querySelector('.aer').textContent;
    let price = cardBox.querySelector('.price').textContent;

    let cartContent = document.querySelector('.cart-content');

    let cartTitles = cartContent.querySelectorAll('.title');
    for (let i = 0; i < cartTitles.length; i++) {
        if (cartTitles[i].textContent === title) {
            alert('Bu mahsulot allaqachon savatchaga qo\'shilgan!');
            return;
        }
    }

    let newCartBox = document.createElement('div');
    newCartBox.classList.add('card-box');

    newCartBox.innerHTML = `
        <img class="small" src="${image}" alt="">
        <div class="card-box-text">
            <h2 class="title">${title}</h2>
            <h3 class="pric">${price}</h3>
            <input value="1" type="number" class="cart-quantity">
        </div>
        <i id="trash" class="fa-solid fa-trash cart-remove"></i>
    `;

    cartContent.append(newCartBox);

    newCartBox.querySelector('.cart-remove').addEventListener('click', cartRemove);
    newCartBox.querySelector('.cart-quantity').addEventListener('change', cartQuantity);

    cartTotal();
}

function cartRemove(e) {
    let target = e.target;
    target.closest('.card-box').remove();
    cartTotal();
}

function cartQuantity(e) {
    let target = e.target;
    if (target.value < 1) {
        target.value = 1;
    }
    cartTotal();
}

// Domlangiz uslubidagi cartTotal funksiyasi
function cartTotal() {
    let cartBoxes = document.querySelectorAll(".card-box");
    let total = 0;
    let totalQuantity = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];

        let priceElement = cartBox.querySelector(".pric");
        let quantityElement = cartBox.querySelector(".cart-quantity");

        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = parseInt(quantityElement.value) || 0;

        total = total + (price * quantity);
        totalQuantity = totalQuantity + quantity;
    }

    document.getElementById("total-amount").innerText = "$" + total;

    let cartCount = document.querySelector(".cart-quantity-count");
    if (cartCount) {
        cartCount.innerText = totalQuantity;
    }
}