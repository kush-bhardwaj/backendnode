const express = require('express');
const { addsubsubcat, getallsubsubcat, updatesubsubcat, deletesubsubcat, singlesubsubcat } = require('../controlls/SubSubCategory');
const SubsubcatRouter = express.Router()
SubsubcatRouter.post('/addsubsubcat',addsubsubcat);
SubsubcatRouter.get('/getsubsubcat',getallsubsubcat);
SubsubcatRouter.put('/updatesubsubcat/:id',updatesubsubcat)
SubsubcatRouter.delete('/deletesubsub/:id',deletesubsubcat)
SubsubcatRouter.get('/singlesubsub/:id',singlesubsubcat)
module.exports = SubsubcatRouter