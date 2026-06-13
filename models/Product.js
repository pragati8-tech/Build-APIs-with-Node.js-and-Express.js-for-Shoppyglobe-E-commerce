const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be less than 0']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be less than 0'],
        default: 0
    }
},
    {
        timestamps: true // createdAt and updatedAt will be added automatically
    }
)

module.exports = mongoose.model('Product', productSchema)