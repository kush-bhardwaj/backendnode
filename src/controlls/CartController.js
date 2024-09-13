require('dotenv').config();
const jwt= require('jsonwebtoken')
const cartModel = require('../model/CartModel');
const {ObjectId} = require('mongodb')
exports.AddCart = async (req, res, next) => {

    try{
        console.log("ueserId",req.user_id)
        const CartDetails = {
            userId: req.user_id,
            productId: req.body.productId,
        }
        const query ={$and:[{productId:CartDetails.productId}]}
        const findQuery = await cartModel.find(query)
        const resData = await cartModel.create(CartDetails)
        if(resData){
            res.json({
                status:'success',
                message:"Product added"
            })
        }else{
            res.json({
                status:"failed",
                message:"unable to add to cart"
            })
        }
    }catch(err){
        res.json({
            status:"failed to add",
            message:"something went wrong",
            error:err
        })
    }
}

exports.CartsAggregate = async function (req, res, next) {
    try {
        const query = { _id: req.params.id }
        console.log(query)
        const resData = await cartModel.aggregate([

            { $match: { _id: new ObjectId(query._id) } },

            {
                $lookup: {
                    from: 'products',
                    localField: "productId",
                    foreignField: "_id",
                    as: "data"
                }
            }
        ])
        if (resData) {
            res.json({
                status: 'success',
                data: resData
            })
        }
        else {
            res.json({
                status: "failed",
                message: "unable to aggregate cart"
            })
        }
    } catch (err) {
        res.end(JSON.stringify({
            status: "failed",
            message: 'someting went wrong',
            error: err
        }))
    }
}

//update cart api here

exports.updateCart = async function(req, res, next){
   try{
    const query ={_id:req.params.id}
    const updateData ={$inc:{quantity:+1}}
    const resData = await cartModel.updateOne({_id:new ObjectId(query._id)},updateData)
    if(resData){
       res.json({
        status:"success",
        message:"One Item Added"
       })
    }else{ 
        res.json({
            status:"failed",
            message:"unable to add item"
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"failed to add Item"
    })
   }
}

//upate cart api end