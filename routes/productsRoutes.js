const express = require('express');
const { getProducts, createProduct, getProductById, deleteProduct } = require('../controllers/productController');
const { protect, restricTo } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(createProduct)

router.route('/:id')
  .get(getProductById)
  .delete(protect, restricTo('admin', 'sales'), deleteProduct)

module.exports = router;