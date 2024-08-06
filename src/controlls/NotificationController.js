const NotificationModel = require("../model/NotificationModel")
exports.addNotification = async(req, res , next)=>{
    try{
        const message ={message:req.body.message}
        console.log("MESSAAGE",message)
    const resData = await NotificationModel.create(message);
    console.log("ResData",resData)
    if(resData){
        res.json({
            status:"success",
            message:'notification added',
            notification:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to add notification"
        })
    }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong to add notification",
            error:err
        })
    }
}

exports.getAllNotification = async(req, res, next)=>{
    try{
        const getData = await NotificationModel.find({});
    if(getData){
        res.json({
            status:"success",
            message:"find notications",
            notification:getData
        })
    }else{
        res.json({
            status:"faild",
            message:"unable tofind notications"
        })
    }
    }catch(err){
        res.json({
            status:"faild",
            message:"something went wrong tofind notications"
        })
    }
}
exports.deleteNotification = async(req,res,next)=>{
    try{
        const getId ={id:req.params._id};
    const resData = await NotificationModel.deleteOne(getId);
    if(resData){
        res.json({
            status:"success",
            message:"notification delete"
        })
    }else{
       res.json({
         status:"failed",
        message:"unable to delete notifcation"
       })
    }
    }catch(err){
        res.json({
            status:"failed",
           message:"something went wrong to delete notifcation"
          })
    }
}