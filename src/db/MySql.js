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
    var sql = 'create table customer (name varchar(25) ,age int)';
    connectConection.query(sql, function(err,result){
        if(err)
            throw err;
        console.log("table created")
    })
    console.log('MySql Connected')
})
module.exports = connectConection;