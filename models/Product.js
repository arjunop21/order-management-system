const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String },
  seller: { type: String },
  status: { 
    type: String, 
    enum: ['instock', 'outofstock', 'faulty'], 
    default: 'instock' 
  },
  lastUpdatedBy: {
    type: String,
    enum: ['manufacturer', 'seller'],
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
