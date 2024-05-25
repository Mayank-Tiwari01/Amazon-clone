import { cart, deleteCartItem, updateCartQuantity, totalCartQuantity, updateDelivery } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOption } from '../data/deliveryOptions.js';

function generateCartHTML() {
  let checkoutHTML = '';
  cart.forEach((item) => {
    let { productId, quantity } = item;
    let matchingProduct = products.find((product) => product.id === productId);
    let delDate = deliveryOption.find(d => d.id === item.deliverId);
    let today = dayjs();
    let deliveryDate = today.add(delDate.days, 'days');
    let deliveryString = deliveryDate.format('dddd, MMMM D');

    checkoutHTML += 
    `
      <div class="cart-item-container js-item-container-${productId}">
        <div class="delivery-date">
          Delivery date: ${deliveryString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label-${productId}"> ${quantity} </span></span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">Update</span>
              <input class="link-primary quantity-input insert-input-${productId}" type="number" />
              <span class="save-quantity-link link-primary" data-product-id="${productId}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-cart-item-id="${productId}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${generateDeliveryDate(productId, item)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.order-summary-js').innerHTML = checkoutHTML;
  attachDeleteEventListeners();
  attachUpdateEventListeners();
  attachSaveEventListeners();
  attachDeliveryOptionListeners();
  update();
}

function attachDeleteEventListeners() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      let id = link.dataset.cartItemId;
      deleteCartItem(id);
      let container = document.querySelector(`.js-item-container-${id}`);
      container.remove();
      update();
    });
  });
}

function attachUpdateEventListeners() {
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      const box = document.querySelector(`.insert-input-${productId}`);
      box.addEventListener('change', () => handleSaveClick(link));
    });
  });
}

function attachSaveEventListeners() {
  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      handleSaveClick(link);
    });
  });
}

function handleSaveClick(link) {
  const productId = link.dataset.productId;
  const container = document.querySelector(`.js-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  const box = document.querySelector(`.insert-input-${productId}`);
  let val = box.value;
  updateCartQuantity(productId, val);
  update();
}

function attachDeliveryOptionListeners() {
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      let { productId, deliveryId } = element.dataset;
      updateDelivery(productId, deliveryId);
    });
  });
}

function generateDeliveryDate(productId, cartItem) {
  let deliveryHTML = '';
  deliveryOption.forEach((item) => {
    let today = dayjs();
    let deliveryDate = today.add(item.days, 'days');
    let deliveryString = deliveryDate.format('dddd, MMMM D');
    let priceString = (item.days === 7) ? 'FREE' : `$${((item.priceCents) / 100).toFixed(2)}-`;
    let isChecked = (cartItem.deliverId === item.id);
    deliveryHTML += 
      `<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-id="${item.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">${deliveryString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
  });
  return deliveryHTML;
}

function update() {
  document.querySelector('.return-to-home-link').innerHTML = totalCartQuantity();
}

generateCartHTML();
