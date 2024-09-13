require('../db/db')
const COLLECTION = require('../db/collection');
const mongoose = require('mongoose');
const {ObjectId   } = require('mongodb')
const CartSchema = mongoose.Schema({
    userId : {type:ObjectId,required:[true ,'userId missing']},
    productId :{type:ObjectId, required:[true,"product id must"]},
    quantity:{type:Number,default:1},
    AddedAt:{type:Date,default:Date.now}
})
const CartModel = new mongoose.model(COLLECTION.cart,CartSchema);
module.exports = CartModel;