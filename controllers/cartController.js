
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// POST /cart - Add the product to the carto
async function addToCart(req, res) {
    try {

        const { productId, quantity } = req.body;

        // Validation
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Both productId and quantity are required'
            });
        }

        // Quantity must be positive
        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be greater than 0'
            });
        }

        // Check if the product exists in MongoDB
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product not found with id ${productId}`
            });
        }

        // Check whether the product is already in the cart or not
        const existingCartItem = await Cart.findOne({ productId });

        if (existingCartItem) {
            // If the item is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();

            return res.status(200).json({
                success: true,
                message: 'Cart item quantity updated successfully',
                data: existingCartItem
            });
        }

        // Create a new cart item
        const cartItem = await Cart.create({
            productId,
            name: product.name,
            price: product.price,
            quantity
        });

        res.status(201).json({
            success: true,
            message: 'Product added to cart successfully',
            data: cartItem
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

// PUT /cart/:id -Update the quantity of the cart item
async function updateCart(req, res) {
    try {

        const { quantity } = req.body;

        // Validation
        if (!quantity) {
            return res.status(400).json({
                success: false,
                message: 'Quantity is required'
            });
        }

        // Quantity should be positive
        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity should be greater than 0'
            });
        }

        // Find the cart item and update it
        const cartItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true } // It will return the updated data
        );

        // Cart item not found
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: `Cart item not found with id ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart item quantity updated successfully',
            data: cartItem
        });

    } catch (error) {

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart item ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// DELETE /cart/:id - Remove the item from the cart
async function removeFromCart(req, res) {
    try {

        // Find the cart item and delete it
        const cartItem = await Cart.findByIdAndDelete(req.params.id);

        // Cart item not found
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: `Cart item nahi mila id ${req.params.id} ke saath`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item removed from the cart',
            data: cartItem
        });

    } catch (error) {

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart item ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = { addToCart, updateCart, removeFromCart };