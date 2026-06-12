// server.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware - JSON for body parse
app.use(express.json());

// Temporary products data
const products = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    price: 1999,
    description: 'High quality wireless headphones',
    stock: 50
  },
  {
    _id: '2',
    name: 'Bluetooth Speaker',
    price: 2999,
    description: 'Portable bluetooth speaker',
    stock: 30
  },
  {
    _id: '3',
    name: 'Smart Watch',
    price: 4999,
    description: 'Feature rich smart watch',
    stock: 20
  }
];

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running!' });
});

// GET /products - // Fetch all products
app.get('/products', (req, res) => {
  try {

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found'
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
})

// GET /products/:id - Fetch a single product by ID
app.get('/products/:id', (req, res) => {
  try {

    const id = req.params.id;

    // Find a product by ID from the products array
    const product = products.find(p => p._id === id);

    // If the product is not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});