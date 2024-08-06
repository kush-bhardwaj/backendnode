// console.log("Jai Siya Ram")
const express = require('express');
const app = express()
const cors= require('cors');

const ProductRouter = require('./src/router/ProductRouter');
const CategoryRouter = require('./src/router/CategoryRouter');
const AdminAccRouter = require('./src/router/AdminAccountRouter');
const SubCatRouter = require('./src/router/SubCategoryRouter');
const SubsubcatRouter = require('./src/router/SubSUbCatRouter');
const SliderRouter = require('./src/router/SliderRouter');
const NotificationRouter = require('./src/router/NotificationRouter');

app.use(cors())
app.use(express.json())
app.use('/image',express.static('./public/upload'))
app.use('/api/auth',AdminAccRouter);
app.use('/api/product',ProductRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/subcategory',SubCatRouter);
app.use('/api/subsubdcat',SubsubcatRouter);
app.use('/api/slider',SliderRouter);
app.use('/api/notification',NotificationRouter);
module.exports = app
