# to do

- mod post-checkout page
  add transactionId to the url
  on page load, get transactionId from url
  get order data from transactionId (user, orders)
  build cart items from order data,
  build download button for each item

- api /download/:sku
  collect zip files
  send zip file (unique url proected by token)
  once downloaded, update the order status, add download date
  order.downloadDate
