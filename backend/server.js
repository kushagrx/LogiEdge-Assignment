const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

var customers = [];
var items = [];

app.get('/customers', function(req, res) {
  res.json(customers);
});

app.post('/customers', function(req, res) {
  var customer = req.body;
  customer.id = Date.now();
  customers.push(customer);
  res.status(201).json(customer);
});

app.get('/items', function(req, res) {
  res.json(items);
});

app.post('/items', function(req, res) {
  var item = req.body;
  item.id = Date.now();
  item.price = Number(item.price);
  items.push(item);
  res.status(201).json(item);
});

app.post('/bills', function(req, res) {
  var customerId = req.body.customerId;
  var itemIds = req.body.itemIds;
  var customer = customers.find(function(c) {
    return c.id === customerId;
  });
  var selectedItems = items.filter(function(i) {
    return itemIds.includes(i.id);
  });
  var total = 0;
  for (var i = 0; i < selectedItems.length; i++) {
    total += selectedItems[i].price;
  }
  res.status(201).json({ customer: customer, items: selectedItems, total: total });
});

app.get('/', function(req, res) {
  res.send('Billing API running');
});

app.listen(5000, function() {
  console.log('Server running on port 5000');
});
