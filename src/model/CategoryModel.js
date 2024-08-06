const COLLECTION= require('../db/collection');
const mongoose =require('mongoose');
const {ObjectId } = require('mongodb')
const CategorySchema = mongoose.Schema({
    catName:{type:String},
    catTitle:{type :String},
    productId:{type:ObjectId},
    status:{type:Boolean,default:0}
})
const CategoryModel = new mongoose.model(COLLECTION.Category,CategorySchema);
module.exports = CategoryModel;