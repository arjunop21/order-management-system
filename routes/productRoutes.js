const express = require('express');
const router = express.Router();
const { addProduct, updateProductStatus, getFaultyProducts } = require('../controllers/productController');

// Add product
router.post('/products', addProduct);

// Update product status
router.put('/products/:productId/status', updateProductStatus);

router.get('/products/faulty', getFaultyProducts);


module.exports = router;
