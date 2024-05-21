export const cart = [
  {
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 12
  }
];

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