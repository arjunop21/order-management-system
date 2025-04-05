const Order = require('../models/Order');
const Product = require('../models/Product');

// Create an Order
exports.createOrder = async (req, res) => {
    try {
      const { productId, seller, manufacturer, customer, quantity, pricePerUnit } = req.body;
  
      if (!productId || !quantity || !pricePerUnit || !seller || !manufacturer || !customer) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Calculate total price
      const totalPrice = quantity * pricePerUnit;
  
      const newOrder = new Order({
        product: productId,
        seller,
        manufacturer,
        customer,
        quantity,
        totalPrice
      });
  
      await newOrder.save();
  
      // Populate product name before sending response
      const savedOrder = await Order.findById(newOrder._id).populate('product', 'name');
  
      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// D) Get all orders with details
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate({
        path: 'product',
        select: 'name' // Only fetch the product name
      });
  
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// E) Get most ordered products in descending order
exports.getMostOrderedProducts = async (req, res) => {
  try {
    const products = await Order.aggregate([
      { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } }},
      { $sort: { totalQuantity: -1 }},
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: "$productDetails" }
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// F) Get total orders & revenue grouped by month
exports.getMonthlyOrdersStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
