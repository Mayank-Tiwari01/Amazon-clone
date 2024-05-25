import { generateCartHTML } from '../scripts/checkout/orderSummary.js'
import { calculatePayment } from './checkout/paymentSummary.js';
generateCartHTML();
calculatePayment();