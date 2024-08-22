require('../db/db')
const COLLECTION = require('../db/collection');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const CartSchema = mongoose.Schema({
    userId : {type:ObjectId},
    productId :{type:ObjectId,unique:true},
    quantity:{type:Number,required:[true,"quanity requried"]}
})
const CartModel = new mongoose.model(COLLECTION.cart,CartSchema);
module.exports = CartModel;