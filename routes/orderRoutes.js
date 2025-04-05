const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getMostOrderedProducts,
  getMonthlyOrdersStats,
  createOrder
} = require('../controllers/orderController');

// D
router.get('/orders', getAllOrders);

// E
router.get('/orders/most-ordered', getMostOrderedProducts);

// F
router.get('/orders/monthly-stats', getMonthlyOrdersStats);

router.post('/orders', createOrder);

module.exports = router;
