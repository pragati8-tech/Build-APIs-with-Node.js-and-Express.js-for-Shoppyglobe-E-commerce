
const mongoose = require('mongoose');

// Check whether it is a valid MongoDB ID or not
const validateObjectId = (req, res, next) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: `Invalid ID format: ${id}`
        });
    }

    next();
};

// Validate the product input
const validateProduct = (req, res, next) => {

    const { name, price, description, stock } = req.body;

    // All fields are mandatory
    if (!name || !price || !description || !stock) {
        return res.status(400).json({
            success: false,
            message: 'All fields are mandatory: name, price, description, and stock'
        });
    }

    // Price must be a valid number
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Price must be a valid number and greater than 0'
        });
    }

    // Stock must be a number
    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({
            success: false,
            message: 'Stock must be a valid number and cannot be less than 0.'
        });
    }

    //name must be at least 3 characters long
    if (name.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Product name must be at least 3 characters long'
        });
    }

    next();
};

// Validate the cart input
const validateCart = (req, res, next) => {

    const { productId, quantity } = req.body;

    // productId is required
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: 'productId is required'
        });
    }

    // Check whether it is a valid MongoDB ID or not
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: `Invalid productId format: ${productId}`
        });
    }

    // Quantity is required
    if (!quantity) {
        return res.status(400).json({
            success: false,
            message: 'Quantity is required'
        });
    }

    // Quantity number hona chahiye
    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Quantity must be a valid number and greater than 0'
        });
    }

    next();
};

// Validate the cart update
const validateCartUpdate = (req, res, next) => {

    const { quantity } = req.body;

    // Quantity is required
    if (!quantity) {
        return res.status(400).json({
            success: false,
            message: 'Quantity is required'
        });
    }

    // Quantity must be a number
    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Quantity must be a valid number and greater than 0'
        });
    }

    next();
};

module.exports = { validateObjectId, validateProduct, validateCart, validateCartUpdate };