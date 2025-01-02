// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render products list
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous content

  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });
}

// Function to render shopping cart list
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear previous content

  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
    });
  }
}

// Function to add product to cart
function addToCart(product) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Save cart to sessionStorage
  renderCart(); // Update cart display
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart(); // Update cart display
}

// Event listener for clearing the cart
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize the page
function init() {
  renderProducts(); // Render products
  renderCart(); // Render cart
}

// Run the initialization function
init();
