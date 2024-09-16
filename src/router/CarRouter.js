const express = require('express');
const { AddCart, CartsAggregate, DeleteCart, IncreaseQunatity, DescreaseQunatity } = require('../controlls/CartController');
const { customerMiddleWare } = require('../middleware/CustomerMiddleware');
const CartRouter = express.Router()
CartRouter.use(customerMiddleWare)
CartRouter.get('/getcart',CartsAggregate)
CartRouter.post('/addcart',AddCart)
CartRouter.put('/updatecart/:id',IncreaseQunatity)
CartRouter.put('/remove/:id',DescreaseQunatity)
CartRouter.delete('/deletecart/:id',DeleteCart)
module.exports = CartRouter;