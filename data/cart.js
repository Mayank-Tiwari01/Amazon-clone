import { deliveryOption } from '../data/deliveryOptions.js';
export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [];
}

function saveCartItems() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, itemsSelectedValue) {
  let foundProduct = cart.find((item) => item.productId === productId);
  if (foundProduct) {
    foundProduct.quantity += parseInt(itemsSelectedValue);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(itemsSelectedValue),
      deliverId: '1'
    });
  }
  saveCartItems();
}

export function deleteCartItem(id) {
  cart = cart.filter((item) => id !== item.productId);
  saveCartItems();
}

export function updateCartQuantity(id, q) {
  cart.forEach((item) => {
    if (item.productId == id) {
      item.quantity = parseInt(q);
      saveCartItems();
      document.querySelector(`.quantity-label-${id}`).innerHTML = q;
    }
  });
}

export function totalCartQuantity() {
  let total = 0;
  cart.forEach((item) => {
    total += parseInt(item.quantity);
  });
  return total;
}

export function updateDelivery(proId, deliveryId) {
  let matchingItem = cart.find(item => item.productId === proId);
  if (matchingItem) {
    matchingItem.deliverId = deliveryId;
    saveCartItems();
  }
}
