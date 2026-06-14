
const express = require('express');
const router = express.Router();

const {  getProducts,getProductById,createProduct } = require('../controllers/productController');
const {  validateObjectId, validateProduct } = require('../middleware/validate');

// GET /products - Fetch all products
router.get('/', getProducts);

// GET /products/:id - Fetch a single product — validate the ID
router.get('/:id', validateObjectId,getProductById);

// POST /products - Add a new product — validate the input
router.post('/', validateProduct,createProduct);

module.exports = router;