import { cart, totalCartQuantity } from "../../data/cart.js";
import { deliveryOption } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

export function calculatePayment() {
  const updateInnerHTML = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = value;
    } else {
      console.error(`Element not found for selector: ${selector}`);
    }
  };

  // Calculate total number of items
  const items = totalCartQuantity();
  updateInnerHTML('.js-total-items-payment', `Items (${items})`);

  const totalPrice = () => {
    return cart.reduce((price, element) => {
      const product = products.find(pro => element.productId === pro.id);
      return product ? price + (product.priceCents * element.quantity) : price;
    }, 0);
  };

  // Show item total price
  const price = totalPrice();
  updateInnerHTML('.js-payment-summary-money', `$${(price / 100).toFixed(2)}`);

  const calculateDeliveryPrice = () => {
    return cart.reduce((price, element) => {
      const option = deliveryOption.find(option => element.deliverId === option.id);
      return option ? price + option.priceCents : price;
    }, 0);
  };

  // Show delivery price
  const deliveryPrice = calculateDeliveryPrice();
  updateInnerHTML('.js-payment-delivery-money', `$${(deliveryPrice / 100).toFixed(2)}`);

  // Show price before tax
  const priceBeforeTax = price + deliveryPrice;
  updateInnerHTML('.js-total-payment-before-tax', `$${(priceBeforeTax / 100).toFixed(2)}`);

  // Calculate and show tax (10% of price before tax)
  const tax = (priceBeforeTax / 100) * 0.1;
  updateInnerHTML('.js-payment-tax', `$${tax.toFixed(2)}`);

  // Calculate and show final price
  const finalPrice = priceBeforeTax + (tax * 100);
  updateInnerHTML('.js-final-payment', `$${(finalPrice / 100).toFixed(2)}`);
}
