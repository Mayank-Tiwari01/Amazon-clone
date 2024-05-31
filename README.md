# Amazon Clone Project

## Description

This project is a clone of the Amazon website built using HTML, CSS, and Vanilla JavaScript. The goal of this project is to solidify core JavaScript skills by replicating key features and functionalities of the Amazon website. The project includes advanced features such as fetching product data from an API, managing cart functionality, and calculating payment details with delivery options.

## Features

- Display products with images, names, ratings, and prices.
- Add products to the cart.
- Update cart quantity and total.
- Show "added to cart" confirmation.
- Remove items from the cart.
- Responsive design for various screen sizes.
- Fetch products from a backend API.
- Calculate and display total price, delivery options, and tax.
- Handle asynchronous operations using async/await.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mayank-Tiwari01/Amazon-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Amazon-clone
   ```

3. Open `index.html` in your web browser.

## Usage

- Browse through products using the search bar or by scrolling.
- Click on a product to view details.
- Add products to the cart by clicking the "Add to Cart" button.
- View and update cart contents by clicking on the cart icon.
- Update product quantities and remove items from the cart.
- Proceed to checkout when ready to purchase.
- During checkout, view order summary, total price, and delivery options.

## Code Overview

### Product Management

- **Product Class**: Defines the structure of a product with properties such as `id`, `image`, `name`, `rating`, and `priceCents`.
- **Clothing Class**: Extends the Product class to include a `sizeChartLink` for clothing items.
- **fetchProducts Function**: Asynchronously fetches product data from an API and maps it to `Product` or `Clothing` instances.
- **getProduct Function**: Retrieves a product by its ID from the list of products.

### Cart Functionality

- **cart**: An array that holds the current items in the cart, retrieved and stored in local storage.
- **addToCart Function**: Adds products to the cart, updates the quantity if the product is already in the cart.
- **deleteCartItem Function**: Removes items from the cart.
- **takeInput Function**: Handles updating the cart quantity based on user input, ensuring values are valid.
- **updateCartQuantity Function**: Updates the quantity of a specific product in the cart and saves the changes.

### Order Management

- **loadOrders Function**: Loads and displays orders, including product details and delivery dates, using dayjs for date formatting.

### Payment Calculation

- **calculatePayment Function**: Calculates and displays the total number of items, item prices, delivery prices, price before tax, tax, and final price.

## Credits

- [Mayank Tiwari](https://github.com/Mayank-Tiwari01) - Developer

## Additional Libraries

- **dayjs**: Used for date formatting in the order management section.
  ```html
  <script type="module" src="https://unpkg.com/dayjs@1.11.10/esm/index.js"></script>
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.

---
