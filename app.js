// console.log("Jai Siya Ram")
const express = require('express');
const app = express()
const cors= require('cors');
const path = require('path')
const ProductRouter = require('./src/router/ProductRouter');
const CategoryRouter = require('./src/router/CategoryRouter');
const AdminAccRouter = require('./src/router/AdminAccountRouter');
const SubCatRouter = require('./src/router/SubCategoryRouter');
const SubsubcatRouter = require('./src/router/SubSUbCatRouter');
const SliderRouter = require('./src/router/SliderRouter');
const NotificationRouter = require('./src/router/NotificationRouter');
const CustumerRouter = require('./src/router/CustomerRouter');
const CartRouter = require('./src/router/CarRouter');

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/image',express.static('./public/upload'))

app.get("/karonasaiyacall",async function(req,res){
       const re =  await fetch("https://reqres.in/api/users?page=2")
       const data = await re.json();
     
    res.json({
        message:"karona",
        data:data
    })
})
app.get('/api/download',async (req, res)=>{
    const downloadFile = __dirname + '/public/upload/record.mp4'
    res.download(downloadFile)
})


//delpoye react in node
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use('/api/auth',AdminAccRouter);
app.use('/api/auth/customer',CustumerRouter)
app.use('/api/product',ProductRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/subcategory',SubCatRouter);
app.use('/api/subsubdcat',SubsubcatRouter);
app.use('/api/cart',CartRouter)
app.use('/api/slider',SliderRouter);
app.use('/api/notification',NotificationRouter);
module.exports = app

