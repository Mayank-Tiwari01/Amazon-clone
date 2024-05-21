export const cart = [];

export function addToCart(productId, itemsSelectedValue) {
  let foundProduct = cart.find((item) => item.productId === productId);
    if (foundProduct) {
      foundProduct.quantity += itemsSelectedValue;
    } else {
      cart.push({
        productId: productId,
        quantity: itemsSelectedValue
      });
    }
}