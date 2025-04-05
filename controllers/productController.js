const Product = require('../models/Product');

// A) Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, manufacturer, seller, status } = req.body;
    const product = new Product({ name, manufacturer, seller, status });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// B) Change product status
exports.updateProductStatus = async (req, res) => {
    try {
      const { productId } = req.params;
      const { status, updatedBy } = req.body; // 'manufacturer' or 'seller'
  
      const validStatuses = ['instock', 'outofstock', 'faulty'];
      const validRoles = ['manufacturer', 'seller'];
  
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      if (!validRoles.includes(updatedBy)) {
        return res.status(400).json({ error: 'Invalid updater role' });
      }
  
      const product = await Product.findByIdAndUpdate(
        productId,
        { status, lastUpdatedBy: updatedBy },
        { new: true }
      );
  
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      res.json({ message: 'Status updated', product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.getFaultyProducts = async (req, res) => {
    try {
      const faultyProducts = await Product.find({ status: 'faulty' });
      res.json(faultyProducts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
