const express = require('express');
const { addCategory, updateCategory, deleteCategory, getAllCategory, categoryAggregate, searchCategory, signleCategory } = require('../controlls/CategoryController');
const { AuthMiddleWare } = require('../middleware/AuthMiddleware');

const CategoryRouter = express.Router();
CategoryRouter.use(AuthMiddleWare)
CategoryRouter.post('/addCategory',addCategory);
CategoryRouter.get('/getAllCategory',getAllCategory);
CategoryRouter.delete('/deleteCategory/:id',deleteCategory);
CategoryRouter.put('/updateCategory',updateCategory);
CategoryRouter.post('/categoryAggregate/:id',categoryAggregate);
CategoryRouter.post("/search/:name",searchCategory)
CategoryRouter.get("/singlecategory/:id",signleCategory)
module.exports = CategoryRouter
