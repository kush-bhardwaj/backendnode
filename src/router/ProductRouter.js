const express = require('express')
const { addProduct, getAllProducts, deleteProduct, updateProduct, uploadImage, productImageAggregate, searchProduct } = require('../controlls/ProductController')
const upload = require('../middleware/UploadMiddleWear')
const { AuthMiddleWare } = require('../middleware/AuthMiddleware')
const ProductRouter =express.Router()
ProductRouter.use(AuthMiddleWare)
ProductRouter.get('/searchProduct', searchProduct)
ProductRouter.post('/addProduct',upload.single('productImg'),addProduct)//complete
ProductRouter.get('/allProduct',getAllProducts) //complete
ProductRouter.delete('/deleteProduct/:id',deleteProduct)//complete
ProductRouter.put('/updateProduct/:id',updateProduct)//complete
ProductRouter.get('/singleProduct/:id')//compelte
ProductRouter.post("/upload",upload.array('productImg','productImg1',"productImg2","productImg3"),uploadImage)//completed
// ProductRouter.get("/upload",upload.single(['image']),uploadImage)
ProductRouter.get("/aggregateProduct/:id",productImageAggregate)//complete
module.exports = ProductRouter;