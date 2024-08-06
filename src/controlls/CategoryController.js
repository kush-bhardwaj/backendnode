const CategoryModel =require('../model/CategoryModel')
const {ObjectId}  = require('mongodb')


//add /insert category
exports.addCategory = async function (req, res, next){
    try{
        const catData ={
            catTitle:req.body.catTitle,
            catName:req.body.catName,
        }
        console.log(catData)
        const catRes = await CategoryModel.create(catData);
        if(catRes){
            res.json({
                status:"success",
                message:"category added !!"
            })
        }else{
            res.json({
                status:"failed",
                message:"unable to add category"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong verify your data",
            error:err
        })
    }
}


// find all category
exports.getAllCategory =async function(req, res,next){
   try{
    const resData = await CategoryModel.find({});
    if(resData){
        res.json({
            status:"success",
            message:"category find successfull",
            data:resData
        })
    }else{
        res.josn({
            status:"failed",
            messageS:"unable to find data" 
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"something went wrong to find data",
        errror:err
    })
   }
}



//updtae categor 
exports.updateCategory = async function(req, res, next){
    try{
        const query = {_id:req.params._id};
        const UpdateData ={
            catTitle:req.body.catTitle,
            catName:req.body.catName,
            productId:req.body.productId
        }
    const resData = await CategoryModel.updateOne(query._id,UpdateData);
    if(resData){
        res.json({
            status:"success",
            message:"category update successfull"
        })
    }else{
        res.josn({
            status:"failed",
            messageS:"unable to update data"
        })
    }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong to update your category"
        })
    }
}


//delete category
exports.deleteCategory =async function(req, res,next){
  try{
    const query ={_id:req.params.id};
    console.log(query)
    const resData = await CategoryModel.deleteOne(query);
    if(resData){
        res.json({
            status:"success",
            message:"delete success"
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to delete data"

        })
    }
  }catch(err){
    res.json({
        status:"failed",
        message:"error",
        error:err
    })
  }
}


//aggregte controller
exports.categoryAggregate = async function (req, res, next){
    try{
        const id=req.params.id
        console.log(id)
    const resData = await CategoryModel.aggregate([
        {$match:{_id:new ObjectId(id)}},
        {$lookup:{
            from:'subcategories',
            localField:"_id",
            foreignField:"catId",
            as:"subCatData"
        }} 
    ])
    if(resData){
        res.json({
            status:"success",
            message:"fetched sync data",
            catAggregateData:resData
        })
    }else{
        res.json({
            status:"failed",
            messge:"unable to fetched data"
        })
    }
    }catch(err){
        res.json({
            status:"faild",
            message:"cannot merge collections.",
            error:err
        })
    }
}

//search category controller
exports.searchCategory = async function(req,res,next){
    try{
        const query = req.params.name;
    const findData ={catName:{$regex:`^${query}`,$options:"i"}}
    const resData = await CategoryModel.findOne(findData);
    if(resData){
        res.json({
            status:"success",
            data:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"uanble to find data"
        })
    }
    }catch(err){
        res.json({
            status:"failed",
            message:'something went wrong to find data please check carefully',
            error:err
        })
    }
}
//search category controller end

//single category find controller
exports.signleCategory = async function(req,res,next){
try{
    const id={_id:req.params.findOne}
    console.log(id)
    const findCat = await CategoryModel.find(id)
    if(findCat){
        res.json({
            status:"success",
            message:"find success",
            data:findCat
        })
    }else{res.json({
        status:"failed",
        message:"unable to find category"
    })}
}catch(err){
    res.json({
        status:"failed",
        message:"something went wrong please check carefully",
        error:err
    })
}
}
//single category find controller end