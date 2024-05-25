export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 12,
    deliverId : '3'
  }]
}
function saveCartItems() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, itemsSelectedValue) {
  let foundProduct = cart.find((item) => item.productId === productId);
  if (foundProduct) {
    foundProduct.quantity += itemsSelectedValue;
  } else {
    cart.push({
      productId: productId,
      quantity: itemsSelectedValue,
      deliverId : '1'
    });
  }
  saveCartItems()
}

export function deleteCartItem(id) {
  cart = cart.filter((item) => id !== item.productId);
  saveCartItems()
}

export function updateCartQuantity(id, q) {
  
  cart.forEach((item) => {
    if (item.productId == id) {
      item.quantity = q;
      saveCartItems();
      document.querySelector(`.quantity-label-${id}`).innerHTML = q;
    }
  })
}

export function totalCartQuantity() {
  let total = 0;
  cart.forEach((item) => {
    console.log(item.quantity)
    total += parseInt(item.quantity);
  });
  return total;
}


