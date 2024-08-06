require('../db/db');
const mongoose = require('mongoose')
const Collection = require('../db/collection');
const {ObjectId} = require('mongodb')
const ImageSchema = mongoose.Schema({
    productId:{type:ObjectId},
    image:{type:String},
    // image1:{type:String}
})

const ImageModel = new mongoose.model(Collection.Upload,ImageSchema);
module.exports = ImageModel;