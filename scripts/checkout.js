import { generateCartHTML } from '../scripts/checkout/orderSummary.js'
import { calculatePayment } from './checkout/paymentSummary.js';
import { fetchProducts } from '../data/products.js';

fetchProducts(() => {
  generateCartHTML();
  calculatePayment();
})
