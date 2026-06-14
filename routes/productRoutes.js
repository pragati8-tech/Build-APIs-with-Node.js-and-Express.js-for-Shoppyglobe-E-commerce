
const express = require('express');
const router = express.Router();

const {  getProducts,getProductById,createProduct } = require('../controllers/productController');

// GET /products - Fetch all products
router.get('/', getProducts);

// GET /products/:id - fetch Single product  
router.get('/:id', getProductById);

// POST /products - Add New product 
router.post('/', createProduct);

module.exports = router;