const express = require('express');
const { AddCart, getCarts } = require('../controlls/CartController');
const CartRouter = express.Router()

CartRouter.post('/addcart',AddCart)
CartRouter.get('/getcart/:id',getCarts)
module.exports = CartRouter;