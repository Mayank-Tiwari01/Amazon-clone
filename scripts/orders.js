import { fetchProducts, getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadOrders() {
  await fetchProducts();

  let ordersHTML = '';

  orders.forEach((item) => {
    const orderTimeString = dayjs(item.orderTime).format('MMMM D');
    ordersHTML += `
      <div class="orders-grid">
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(item.totalCostCents / 100).toFixed(2)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${item.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
            ${productsListHTML(item)}
          </div>
        </div>
      </div>
    `;
  });

  function productsListHTML(item) {
    let productDetailsHTML = '';
    item.products.forEach((detail) => {
      const product = getProduct(detail.productId);
      productDetailsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(detail.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${detail.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${item.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return productDetailsHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

loadOrders();
