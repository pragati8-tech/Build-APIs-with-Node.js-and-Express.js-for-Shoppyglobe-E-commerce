// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const Product = require('./models/Product')
const productRoutes = require('./routes/productRoutes')
dotenv.config();
connectDB()
const app = express();

// Middleware - JSON for body parse
app.use(express.json());

// Product Routes
app.use('/products', productRoutes)

// Temporary products data
// const products = [
//   {
//     _id: '1',
//     name: 'Wireless Headphones',
//     price: 1999,
//     description: 'High quality wireless headphones',
//     stock: 50
//   },
//   {
//     _id: '2',
//     name: 'Bluetooth Speaker',
//     price: 2999,
//     description: 'Portable bluetooth speaker',
//     stock: 30
//   },
//   {
//     _id: '3',
//     name: 'Smart Watch',
//     price: 4999,
//     description: 'Feature rich smart watch',
//     stock: 20
//   }
// ];

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running!' });
});

// GET /products - // Fetch all products
// app.get('/products', (req, res) => {
//   try {

//     if (!products || products.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No products found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// })

// GET /products/:id - Fetch a single product by ID
// app.get('/products/:id', (req, res) => {
//   try {

//     const id = req.params.id;

//     // Find a product by ID from the products array
//     const product = products.find(p => p._id === id);

//     // If the product is not found
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: `Product not found with id ${id}`
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// });

// POST /cart - Add the product to the cart

// const cart = []
// app.post('/cart', (req, res) => {
//   try {

//     const { productId, quantity } = req.body;

//     // If productId or quantity is missing from the request body
//     if (!productId || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: 'Both productId and quantity are required'
//       });
//     }

//     // Quantity must be positive
//     if (quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Quantity must be greater than 0'
//       });
//     }

//     // Check if the product exists
//     const product = products.find(p => p._id === productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: `Product not found with id ${productId}`
//       });
//     }

//     // Check if the product is already in the cart
//     const cartItem = cart.find(item => item.productId === productId);

//     if (cartItem) {
//       // If the product is already in the cart, update the quantity
//       cartItem.quantity += quantity;

//       return res.status(200).json({
//         success: true,
//         message: 'The quantity has been updated in the cart',
//         data: cartItem
//       });
//     }

//     // Add a new item to the cart
//     const newCartItem = {
//       cartItemId: String(cart.length + 1),
//       productId,
//       name: product.name,
//       price: product.price,
//       quantity
//     };

//     cart.push(newCartItem);

//     res.status(201).json({
//       success: true,
//       message: 'The product has been added to the cart',
//       data: newCartItem
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// });

// PUT /cart/:id - Update the quantity of the cart item
// app.put('/cart/:id', (req, res) => {
//   try {

//     const id = req.params.id;
//     const { quantity } = req.body;

//     //  If quantity is missing from the request body
//     if (!quantity) {
//       return res.status(400).json({
//         success: false,
//         message: 'Quantity is required'
//       });
//     }

//     // Quantity must be positive
//     if (quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Quantity must be greater than 0'
//       });
//     }

//     // Find the item in the cart
//     const cartItem = cart.find(item => item.cartItemId === id);

//     // If the cart item is not found
//     if (!cartItem) {
//       return res.status(404).json({
//         success: false,
//         message: `Cart item not found with id ${id}`
//       });
//     }

//     // Update the quantity
//     cartItem.quantity = quantity;

//     res.status(200).json({
//       success: true,
//       message: 'Cart item quantity updated successfully',
//       data: cartItem
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// });

// DELETE /cart/:id - Remove the item from the cart
// app.delete('/cart/:id', (req, res) => {
//   try {

//     const id = req.params.id;

//     // Find the item in the cart
//     const cartItemIndex = cart.findIndex(item => item.cartItemId === id);

//     // If the cart item is not found
//     if (cartItemIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: `Cart item not found with id ${id}`
//       });
//     }

//     //Remove the item from the cart
//     const deletedItem = cart.splice(cartItemIndex, 1);

//     res.status(200).json({
//       success: true,
//       message: 'The item has been removed from the cart',
//       data: deletedItem[0]
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});