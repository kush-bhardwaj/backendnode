
const SubCatModel = require('../model/subCategoryModel');
const SubCategoryModel = require('../model/subCategoryModel');
const {ObjectId} = require('mongodb')
//add sub category controller
exports.addSubCat = async function(req , res, next){
    try{    
        const subCat ={
        subCatName:req.body.subCatName,
        subCatTitle:req.body.subCatTitle,
        catId:req.body.catId
    }
    const resData = await SubCategoryModel.create(subCat)
    if(resData){
        res.json({
            status:"success",
            message:"subcategory added"
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to add subcategory"
        })
    }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong"
        })
    }
}   

//get/find subcategory controller

exports.getSubCat = async function(req,res,next){
    try{    
    const resData = await SubCategoryModel.find({})
    // console.log(resData)
    if(resData){
        res.json({
            status:"success",
            message:"subcategory fetched",
            data:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to find subcategory"
        })
    }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong"
        })
    }
}


//update subcaegory controller
exports.updateSubCat = async function(req, res, next){
   try{
    const query = {_id:req.params._id}
    const updateData ={
         subCatName:req.body.subCatName,
        subCatTitle:req.body.subCatTitle
    }
    const resData = await SubCategoryModel.updateOne(query,updateData)
    if(resData){
        res.json({   
            status:"success",
            message:"subcategory updated"
        })
    }else{
        res.json({
            status:"failed",
            message:"cannot  update subcategory"
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"unable to update subcategory",
        
    })
   }
}


//delete subcategory controller
exports.deleteSubCat= async function(req , res, next){
   try{
    const query = {_id:req.params.id}

    const resData =  await SubCategoryModel.deleteOne(query)
    if(resData){
        res.json({
            status:"success",
            message:"subcategory deleted"
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to delete subcategory"
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"something went wrong to delete"
    })
   }
}


// find single subcategory controller
exports.singleSubCat = async function(req , res,next){
    try{
        const query ={_id:req.params.id};
        // console.log(query)
        const resData = await SubCategoryModel.findOne(query);
        if(resData){s
            res.json({
                status:"success",
                message:"data fetched",
                data:resData
            })
        }else{
            res.json({
                statu:"failed",
                message:"unable to fetch data"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong to get single data",
            errpr:err
        })
    }

}

//search subcategory controller
exports.searchSubCategory = async function(req, res, next){
    try{
        const query = req.params.name;
    const findData = {subCatName:{$regex:`^${query}`,$options:"i"}};
    const resData = await SubCatModel.find(findData)
    if(resData){
        res.json({
            status:"success",
            data:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"failed to search data"
        })
    }
    }catch(err){
        res.json({
            stats:"failed",
            message:"something went wrong please check carefullly"
        })
    }

}

//aggregate
exports.aggregate = async (req, res, next)=>{
   try{
    const query =req.params.id;
    const resData = await SubCategoryModel.aggregate([
        {$match:{_id:new ObjectId(query)}},
        {$lookup:{
            from:"subsubcategories",
            localField:"_id",
            foreignField:"subcatid",
            as:"sucatdata"
        }}
    ])
    if(resData){
        res.json({
            status:"success",
            message:"sync data fatched",
            aggregateData:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to find sync data"
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"something went wrong try again to sync"
    })
   }
}