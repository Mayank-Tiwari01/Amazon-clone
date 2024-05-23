import { cart, deleteCartItem, updateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";

function generateCartHTML() {
  let checkoutHTML = '';
  cart.forEach((item) => {
    let { productId, quantity } = item;
    let matchingProduct = products.find((product) => product.id === productId);

    checkoutHTML += 
    `
      <div class="cart-item-container   js-item-container-${productId}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label-${productId}"> ${quantity} </span>
              </span>


              <span class="update-quantity-link link-primary js-update-link"  data-product-id = "${productId}">
                Update
              </span>

              <input class="link-primary quantity-input insert-input-${productId}" type="number" />
              <span class="save-quantity-link link-primary"  data-product-id = "${productId}">Save</span>

              <span class="delete-quantity-link link-primary js-delete-link" data-cart-item-id="${productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${productId}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.order-summary-js').innerHTML = checkoutHTML;
  attachDeleteEventListeners();
}
generateCartHTML();
function attachDeleteEventListeners() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      let id = link.dataset.cartItemId
      deleteCartItem(id);

      //generateCartHTML(); you could do this to re generate the whole html, but removing the container seems more efficient.


      let container = document.querySelector(`.js-item-container-${id}`);
      container.remove();
    });
  });
}



document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });


//when save button is pressed the quantity is updated.
document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const box = document.querySelector(`.insert-input-${productId}`);
      let val = box.value;
      updateCartQuantity(productId, val);
  })
})
