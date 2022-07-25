const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://localhost:27017/farmStand').then(() => {

    console.log("connected to DB")
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {

    res.render('home', { hometest: 'testHome' })
})


app.listen(3000, () => {

    console.log("Listening on Port 3000")
})
