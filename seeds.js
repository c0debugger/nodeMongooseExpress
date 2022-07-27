const e = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.js')

mongoose.connect('mongodb://localhost:27017/farmStand').then(() => {

    console.log('CONNECTED TO DB')
})


const data =
    [
        {

            name: 'apple',
            price: 2,
            category: 'fruit',
            required: true
        },
        {

            name: 'bannana',
            price: 1.25,
            category: 'dairy',
            required: true
        },
        {

            name: 'carrot',
            price: 1,
            category: 'fruit',
            required: true
        }
    ];

Product.insertMany(data).then((e) => {

    console.log(e);
})

