### XMLHttpRequest (XHR) vs Promises

#### 1. Using `XMLHttpRequest`

```javascript
export let products = [];

export function fetchProducts(renderProductsGrid) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      products = JSON.parse(xhr.response).map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      renderProductsGrid();
    } else {
      console.error(`Failed to fetch products: ${xhr.status}`);
    }
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
```

**Explanation:**
- **XHR Object Creation**: A new `XMLHttpRequest` object is created to handle the request.
- **Event Listener**: An event listener is added to handle the `load` event, which is triggered when the request is completed.
- **Status Check**: The status of the response is checked to ensure it is within the 200-299 range, indicating success.
- **Response Parsing**: The response is parsed from JSON and mapped to instances of `Product` or `Clothing`.
- **Callback Invocation**: The `renderProductsGrid` function is called to update the UI.
- **Error Handling**: Errors are logged if the request fails.

#### 2. Using `fetch` and Promises

```javascript
export let products = [];

export function fetchProducts(renderProductsGrid) {
  fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      products = data.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
    })
    .then(() => {
      renderProductsGrid();
    })
    .catch((error) => {
      console.error('Failed to fetch products:', error);
    });
}
```

**Explanation:**
- **Fetch API**: The `fetch` function is used to make an HTTP request.
- **Response Handling**: The response is checked for success using the `.ok` property. If the response is not successful, an error is thrown.
- **JSON Parsing**: The response body is parsed as JSON.
- **Data Mapping**: The JSON data is mapped to instances of `Product` or `Clothing`.
- **Callback Invocation**: The `renderProductsGrid` function is called to update the UI.
- **Error Handling**: Errors are caught and logged using the `.catch` method.

### Why Promises and `fetch` are Better

1. **Readability and Simplicity**:
   - The `fetch` API provides a cleaner and more readable syntax compared to `XMLHttpRequest`. It avoids the need for nested callbacks, making the code easier to understand and maintain.

2. **Built-in Promises**:
   - The `fetch` API is built on promises, which are a more modern and intuitive way to handle asynchronous operations. Promises allow for chaining and better error handling.

3. **Error Handling**:
   - Promises provide a `.catch` method that handles errors in a more straightforward manner than the traditional `XMLHttpRequest` error handling.

4. **Less Boilerplate Code**:
   - `fetch` reduces the amount of boilerplate code required for making requests. For example, it automatically handles opening the request, sending it, and setting up event listeners.

5. **Consistency**:
   - Promises provide a consistent API for working with asynchronous operations, which is useful when dealing with multiple asynchronous tasks. It allows for better composition of async code using `Promise.all`, `Promise.race`, etc.

### Conclusion

Using promises with the `fetch` API is recommended due to its cleaner syntax, better error handling, and modern approach to handling asynchronous operations. It makes the code more readable and maintainable, reducing the chances of introducing bugs.