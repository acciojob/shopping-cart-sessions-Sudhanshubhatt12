// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Initialize cart in session storage if not exists
if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", JSON.stringify([]));
}

// Function to render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear the product list before rendering

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Function to render cart list
function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart"));
  cartList.innerHTML = ""; // Clear the cart list before rendering

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove" buttons
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// Function to add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const cart = JSON.parse(sessionStorage.getItem("cart"));

  // Check if product is already in the cart
  const productInCart = cart.find((item) => item.id === productId);

  if (!productInCart) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Function to remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// Event listener for clearing the cart
clearCartButton.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
