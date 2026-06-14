
const express = require('express');
const router = express.Router();
const {addToCart,updateCart,removeFromCart} = require('../controllers/cartController');
const {  validateObjectId,validateCart,validateCartUpdate } = require('../middleware/validate')
const protect = require('../middleware/auth')

// POST /cart - Add the product to the cart -  validate the input
router.post('/',protect,validateCart, addToCart);

// PUT /cart/:id -  Update the cart item quantity — validate the ID and input
router.put('/:id', protect,validateObjectId,validateCartUpdate,updateCart);

// DELETE /cart/:id - Remove an item from the cart — validate the ID
router.delete('/:id', protect,validateObjectId,removeFromCart);

module.exports = router;