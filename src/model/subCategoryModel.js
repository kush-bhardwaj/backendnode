require('../db/db')
const COLLECTION =require('../db/collection')
const mongoose  =require('mongoose')
const {ObjectId}  =require('mongodb')
const SubCategorySchema = mongoose.Schema({
    subCatName:{type:String},
    subCatTitle:{type:String},
    catId:{type:ObjectId} 
})
const SubCatModel = new mongoose.model(COLLECTION.SubCategory,SubCategorySchema)
module.exports = SubCatModel;
