const express = require('express');
const { AddCart, CartsAggregate, updateCart } = require('../controlls/CartController');
const { customerMiddleWare } = require('../middleware/CustomerMiddleware');
const CartRouter = express.Router()
CartRouter.use(customerMiddleWare)
CartRouter.post('/addcart',AddCart)
CartRouter.get('/getcart/:id',CartsAggregate)
CartRouter.put('/updateCart/:id',updateCart)
module.exports = CartRouter;