require("..//db/db")
const COLLECTION = require("../db/collection")
const mongoose = require('mongoose');
const SliderSchema = mongoose.Schema({
    image:{type:String,required:[true,"image must"]}
})
const SliderModel = new mongoose.model(COLLECTION.slider,SliderSchema);
module.exports = SliderModel;