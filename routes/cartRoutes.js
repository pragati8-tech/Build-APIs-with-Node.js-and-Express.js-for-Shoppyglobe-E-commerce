
const express = require('express');
const router = express.Router();

const {addToCart,updateCart,removeFromCart} = require('../controllers/cartController');

// POST /cart - Add the product to the cart
router.post('/', addToCart);

// PUT /cart/:id -  Update the quantity of the cart item
router.put('/:id', updateCart);

// DELETE /cart/:id - Remove the item from the cart
router.delete('/:id', removeFromCart);

module.exports = router;