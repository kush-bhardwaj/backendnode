require('dotenv');
const jsonToken = require('jsonwebtoken');
exports.customerMiddleWare = async(req, res, next)=>{
    try{
    //    console.log('token',req.rawHeaders[1].split(' ')[1])
        const customerToken = req.headers['authorization'].split(" ")[1]
        // console.log("authorization",customerToken)

        const customerInfo = jsonToken.verify(customerToken,process.env.SECRET_KEY)
        console.log("customerInfo",customerInfo)
        if(customerInfo){
            req.user_id = customerInfo.customerId
            next()
        }else{
            res.json({
                status:"failed",
                message:"unauthrized user"
            })
        }
        
    }catch(err){
        res.json({
            status:"failed",
            message:"Unauthorizaed user detect",
            error:err
        })
    }
}