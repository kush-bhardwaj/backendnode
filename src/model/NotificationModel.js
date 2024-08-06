require("../db/db")
const COLLECTION = require('../db/collection')
const mongoose = require("mongoose");
const NotificationSchema = mongoose.Schema({
    message:{type:String, required:[true,"message require"]}
})
const NotificationModel = new mongoose.model(COLLECTION.Notification,NotificationSchema);
module.exports = NotificationModel;