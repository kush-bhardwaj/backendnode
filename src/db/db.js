require('dotenv').config({path:"./.env"})
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log("Database Connected")
},(fail)=>{
    console.log("fail to connect database")
})
