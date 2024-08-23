require('dotenv').config()
const mysql = require('mysql')
const connectConection = mysql.createConnection({
    host:process.env.SqlHost,
    user:process.env.SqlUser,
    password:process.env.SqlPassword,
    database:process.env.SqlDB
});
connectConection.connect((err)=>{
    if(err){
        console.log('failed to connect Mysql');
        return;
    }
    console.log('MySql Connected')
})
module.exports = connectConection;