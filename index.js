const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const { application } = require('express');
var methodOverride = require('method-override')


const categories = ['fruit', 'dairy', 'vegetable']

const app = express();



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

mongoose.connect('mongodb://localhost:27017/farmStand').then(() => {

    console.log("connected to DB")
})


app.delete('/products/:id', async (req, res) => {

    const { id } = req.params;
    const product = await Product.deleteOne({ _id: id }, { new: true });
    console.log(product);
    res.redirect('/products')
})

app.put('/products/:id', async (req, res) => {

    console.log(req.body)
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    console.log(product);
    res.redirect('/products')
})

app.post('/products', async (req, res) => {
    const product = {}
    // console.log(req.body)
    product.name = req.body.productName;
    product.price = req.body.productPrice;
    product.category = req.body.productCat;
    const newProduct = await Product.create(product)
    console.log(newProduct);
    res.redirect('/products')

})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById({ _id: id });
    res.render('products/edit', { product, categories });
})

app.get('/products/new', (req, res) => {

    res.render('products/new', { categories })
})

app.get('/products/:id', async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById({ _id: id })
    res.render('products/details', { product })

})

app.get('/products', async (req, res) => {

    const products = await Product.find({});
    res.render('products/index', { products })
    // console.log(products);

})

app.get('/', (req, res) => {

    res.render('home', { hometest: 'testHome' })
})


app.listen(3000, () => {

    console.log("Listening on Port 3000")
})




//INDEX     /products/          GET
//NEW       /products/new       GET FORM
//Create    /products           POST
//Update    product/:id/edit    GET
//update    product/:id         patch
//Show      product/:id         GET
//destroy   product/:id         delete
