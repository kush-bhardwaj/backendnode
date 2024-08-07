require('../db/db')
const {ObjectId} = require("mongodb")
const COLLECTION = require('../db/collection')

const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
    productName:{type:String},
    productPrice:{type:String},
    productCurrency:{type:String,enm:["USD","INR"]},
    productUnit:{type:String,enm:["KG","POUND"]},
    productRating:{type:String},
    productFeedback:{type:String},
    productStock:{type:Number}, 
    productInstock:{type:Boolean},
    productCat_Id:{type:ObjectId},
    productSubCatId:{type:ObjectId},
    productDescription:{type:String},
    productTitle:{type:String},
    productImg:{type:String,default:".png"},
})
const ProductModel = new mongoose.model(COLLECTION.Product,ProductSchema)
module.exports = ProductModel