const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product
    seller: String,
    manufacturer: String,
    customer: String,
    quantity: Number,
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Order', orderSchema);
