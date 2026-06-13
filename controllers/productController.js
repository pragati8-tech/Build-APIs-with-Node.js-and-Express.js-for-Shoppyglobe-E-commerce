
const Product = require('../models/Product');

// GET /products -  Fetch all products
async function getProducts(req, res) {
  try {

    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No product found'
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// GET /products/:id - Fetch a single product
async function getProductById(req, res){
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {

    // If the ID format is invalid
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// POST /products - Add a new product
 async function createProduct(req, res){
  try {

    const { name, price, description, stock } = req.body;

    // Validation
    if (!name || !price || !description || !stock) {
      return res.status(400).json({
        success: false,
        message: 'Saare fields required hain - name, price, description, stock'
      });
    }

    const product = await Product.create({ name, price, description, stock });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = { getProducts, getProductById, createProduct };