const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,

    },
    price: {
        type: Number,
        min: 0
    },
    category: {

        type: String,
        enum: ['fruit', 'dairy', 'vegetable']
    }


})

const Product = new mongoose.model('Product', productSchema);


module.exports = Product;