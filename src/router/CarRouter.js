const express = require('express');
const { AddCart } = require('../controlls/CartController');
const CartRouter = express.Router()

CartRouter.post('/addcart',AddCart)
module.exports = CartRouter;