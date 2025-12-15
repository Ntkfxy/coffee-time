/* ===== LOGIN ===== */
function checkLogin() {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
  } else {
    displayWelcomeMessage();
  }
}

function displayWelcomeMessage() {
  const welcomeMessageEl = document.getElementById("welcomeMessage");
  if (welcomeMessageEl) {
    welcomeMessageEl.innerText = "ยินดีต้อนรับสู่ Coffee Time!";
  }
}

function logout() {
  localStorage.removeItem("login");
}

/* ===== CART (LocalStorage) ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("count");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} บาท
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
    total += item.price;
  });

  totalEl.innerText = total;
  countEl.innerText = cart.length;
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("❌ ตะกร้าว่าง");
    return;
  }

  alert("✅ สั่งซื้อสำเร็จ ขอบคุณครับ ☕");
  cart = [];
  saveCart();
  loadCart();
}
