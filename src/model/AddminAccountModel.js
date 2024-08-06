require('../db/db')
const COLLECTION = require('../db/collection')
const mongoose = require('mongoose')
const AdmindAccSchema = mongoose.Schema({
    name:{type:String,required:[true ,'Name is must']},
    email:{type:String,required:[true ,'Email is must'],unique:true},
    password:{type:String},
    phone:{type:String,required:[true , 'phone is must'],unique:true},
    account_status:{type:Number,default:0}
   
})
const AdminAccModel = new mongoose.model(COLLECTION.admin,AdmindAccSchema);
module.exports = AdminAccModel;
