import { generateCartHTML } from '../scripts/checkout/orderSummary.js'
import { calculatePayment } from './checkout/paymentSummary.js';
import { fetchProducts } from '../data/products.js';
new Promise((resolve) => {
  fetchProducts (() => {
    resolve();
  })
}).then(() => {
  generateCartHTML();
  calculatePayment();
})

// async function runIt() {
//   await fetchProducts(renderProductsGrid);
//   generateCartHTML();
//   calculatePayment();
// }
// runIt();
/*
fetchProducts(() => {
  generateCartHTML();
  calculatePayment();
})
*/
