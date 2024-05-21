// import {cart} from '/Users/mayan/Learn-Web-Development/javascript-amazon-project-main/data/cart';
//not working
let productsHTML = '';
let totalQuantity = 0;
products.forEach((product) => {
  productsHTML += 
  `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ₹${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="quantity-js-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart added-to-cart-js-${product.id}"  >
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id = "${product.id}"> <!-- this will allow us to find which button was clicked -->
      Add to Cart
    </button>
  </div>
  `
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId;
    let itemsSelected = document.querySelector(`.quantity-js-${productId}`);
    let itemsSelectedValue = parseInt(itemsSelected.value);

    let foundProduct = cart.find((item) => item.productId === productId);

    if (foundProduct) {
      foundProduct.quantity += itemsSelectedValue;
    } else {
      cart.push({
        productId: productId,
        quantity: itemsSelectedValue
      });
    }

    totalQuantity += itemsSelectedValue;
    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;

    // Show "added to cart" image for 2 seconds
    let addedToCart = document.querySelector(`.added-to-cart-js-${productId}`);
    addedToCart.style.opacity = 1;

    //check if the timeoutId property exists on the addedToCart element
    //if it is clicked for the first time it won't exist and will give a falsy value (undefined)
    //if it exists that means 2 secs has'nt passed, so it clears the settimeout function and we add it again in the next line.
    if (addedToCart.timeoutId) {
      clearTimeout(addedToCart.timeoutId);
    }

    // Set new timeout
    addedToCart.timeoutId = setTimeout(() => {
      addedToCart.style.opacity = 0;
    }, 2000);
  });
});


// document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//   button.addEventListener('click', () => {
//     let productId =  button.dataset.productId;
//     let temp;
//     cart.forEach((item) =>{
//       if (productId == item.productId) {
//         temp = item;
//       }
//     });

//     if (temp) {
//       temp.quantity++;
//     }
//     else {
//       cart.push({
//         productId : productId,
//         quantity : 1
//       });
//     }

//     let totalQuantity = 0;
//     cart.forEach((item) => {
//       totalQuantity += item.quantity;
//     });
//     document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;

//   });
// });
