//elements references
const productsContainer = document.getElementById("productsContainer");
const cartsContainer = document.getElementById("cartsContainer");
const feedbackElement = document.getElementById("feedback");
const totalPrice = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCart");
const sortByPriceBtn = document.getElementById("sortByPrice");

//default products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];

//empty cart
const cart = [];

//used to reset the timer(user feedback)
let timerId;

//listeners
clearCartBtn.addEventListener("click", clearCart);

sortByPriceBtn.addEventListener("click", sortByPrice);

function clearCart() {
  cart.length = 0;
  renderCartDetails();
  updateUserFeedback("Cart is cleared", "success");
}

function sortByPrice() {
  cart.sort((item1, item2) => {
    return item1.price - item2.price;
  });
  renderCartDetails();
}

function renderProductDetails() {
  products.forEach(function (product) {
    // <div class="product-row">
    //       <p>Laptop - Rs. 50000</p>
    //       <button>Add to cart</button>
    //     </div>

    // const productRow = `
    // <div class = "product-row">
    // <p>${product.name} -  Rs. ${product.price}</p>
    // <button>Add to cart</button>
    // </div>`;
    // productsContainer.insertAdjacentHTML("beforeend", productRow);

    //or
    const { id, name, price } = product;
    const divElement = document.createElement("div");
    divElement.className = "product-row";
    divElement.innerHTML = `<p>${name} -  Rs. ${price}</p>
   <button onclick = "addToCart(${id})">Add to cart</button>`;
    productsContainer.appendChild(divElement);
  });
}

function renderCartDetails() {
  cartsContainer.innerHTML = "";
  cart.forEach((product) => {
    const { id, name, price } = product;
    const divElement = document.createElement("div");
    divElement.className = "product-row";
    divElement.innerHTML = `<p>${name} -  Rs. ${price}</p>
   <button onclick = removeFromCart(${id})>Remove</button>`;
    cartsContainer.appendChild(divElement);
  });
  // totalSum = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   totalSum = totalSum + cart[i].price;
  // }
  const totalSum = cart.reduce(function (acc, curProduct) {
    return acc + curProduct.price;
  }, 0);
  totalPrice.textContent = `Rs. ${totalSum}`;
}

//add to cart
function addToCart(productId) {
  // console.log("add to cart clicked", productId);
  // check if the product available in the cart.
  const isProductAvailable = cart.some((product) => product.id === productId);

  if (isProductAvailable) {
    updateUserFeedback(`Item already added to the cart`, "error");
    return;
  }

  const productToAdd = products.find((product) => product.id === productId);
  // console.log(productToAdd);
  cart.push(productToAdd);
  renderCartDetails();

  updateUserFeedback(`${productToAdd.name} is added to the cart`, "success");
}

function removeFromCart(productId) {
  console.log(productId);
  // const updatedCart = cart.filter((product) => {
  //   return product.id !== productId;
  // });
  const product = cart.find((product) => product.id === productId);
  const productIndex = cart.findIndex((product) => {
    return product.id === productId;
  });
  cart.splice(productIndex, 1);
  // console.log(updatedCart);
  // cart = updatedCart;
  updateUserFeedback(`${product.name} is removed from the cart`, "error");
  renderCartDetails();
}

function updateUserFeedback(msg, type) {
  //type - succes(green), error(red)
  clearTimeout(timerId);
  feedbackElement.style.display = "block";
  if (type === "success") {
    feedbackElement.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedbackElement.style.backgroundColor = "red";
  }
  feedbackElement.textContent = msg;

  timerId = setTimeout(function () {
    feedbackElement.style.display = "none";
  }, 3000);
}

//rendering products
renderProductDetails();
