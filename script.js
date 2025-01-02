const products = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 30 },
      { id: 4, name: "Product 4", price: 40 },
      { id: 5, name: "Product 5", price: 50 },
    ];

    const productList = document.getElementById("product-list");
    const cartList = document.getElementById("cart-list");
    const clearCartButton = document.getElementById("clear-cart-btn");

    // Initialize cart in session storage if not already present
    if (!sessionStorage.getItem("cart")) {
      sessionStorage.setItem("cart", JSON.stringify([]));
    }

    // Render product list
    function renderProducts() {
      productList.innerHTML = ""; // Clear existing products before rendering

      products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
      });

      // Add event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.getAttribute("data-id"));
          if (isNaN(productId)) {
            console.error('Invalid product ID');
            return;
          }
          addToCart(productId);
        });
      });
    }

    // Render cart list
    function renderCart() {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      cartList.innerHTML = ""; // Clear existing cart items

      if (cart.length === 0) {
        cartList.innerHTML = "<li>Your cart is empty.</li>";
      } else {
        cart.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.name} - $${item.price}`;
          cartList.appendChild(li);
        });
      }
    }

    // Add item to cart
    function addToCart(productId) {
      const product = products.find((product) => product.id == productId);
      if (!product) {
        console.log("Product not found!");
        return;
      }

      const cart = JSON.parse(sessionStorage.getItem("cart"));
      const productInCart = cart.find((item) => item.id === productId);

      if (!productInCart) {
        cart.push(product);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Update the cart view
      }
    }

    // Clear cart
    function clearCart() {
      sessionStorage.setItem("cart", JSON.stringify([]));
      renderCart(); // Clear the cart display
    }

    // Attach event listener to clear cart button
    clearCartButton.addEventListener("click", clearCart);

    // Initial render
    renderProducts();
    renderCart();