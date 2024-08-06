const express =require('express')
const { getSubCat, addSubCat, singleSubCat, deleteSubCat, updateSubCat, subCatAggregate, aggregate, searchSubCategory } = require('../controlls/SubCatController');
const { AuthMiddleWare } = require('../middleware/AuthMiddleware');
const SubCatRouter = express.Router()
SubCatRouter.use(AuthMiddleWare)
SubCatRouter.get("/getsubcat",getSubCat);
SubCatRouter.post('/addsubcat',addSubCat);
SubCatRouter.get("/getsinglesubcat/:id",singleSubCat);
SubCatRouter.delete("/deletesubcat/:id",deleteSubCat);
SubCatRouter.put("/updatesubcat/:_id",updateSubCat);
SubCatRouter.get('/aggregate/:id',aggregate)
SubCatRouter.get('/searchSubCategory',searchSubCategory)
module.exports = SubCatRouter