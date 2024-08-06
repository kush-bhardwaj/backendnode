require('../db/db')
const COLLECTION = require('../db/collection')
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')
const SubSubCategorySchema = mongoose.Schema({
    subsubcatname:{type:String,required:true},
    subsubcattitle:{type:String,required:true},
    subcatid:{type:ObjectId,required:true}
})
const SubSubCategoryModel = new mongoose.model(COLLECTION.SubSubCategory,SubSubCategorySchema);
module.exports = SubSubCategoryModel;