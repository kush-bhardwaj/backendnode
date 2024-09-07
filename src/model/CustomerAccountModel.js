require('../db/db');
const mongoose = require('mongoose');
const COLLECTION = require('../db/collection');
const CustomerSchema = mongoose.Schema({
    custumerName :{type:String,required:[true,"customer name require"],validate:{validator:(v)=>{
        if(v.length <= 4){
            return "minimum length should 4"
        }
    }}},
    custumerEmail :{type:String,required:[true,"customer email require"],unique:true},
    custumerPassword :{type:String,required:[true,"customer password require"]},
    custumerMobile :{type:String,required:[true,"customer phoner number require"],unique:true},
    customer_status:{type:Number,default:0}
});
const CustomerModel = new mongoose.model(COLLECTION.customer,CustomerSchema);
module.exports = CustomerModel;
