export let orders = JSON.parse(localStorage.getItem('orders'))|| [];

export function addOrder(order) {
  orders.unshift(order);
  saveToOrder();
}
function saveToOrder() {
  localStorage.setItem('orders', JSON.stringify(orders));
}