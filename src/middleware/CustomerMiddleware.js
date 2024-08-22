require('dotenv');
const jsonToken = require('jsonwebtoken');
exports.customerMiddleWare = async(req, res, next)=>{
    try{
        const customerToken = req.headers['Authorization'].split(" ")[1]
        const customerInfo = jsonToken.verify(customerToken,process.env.SECRET_KEY)
        if(customerInfo){
            req.user_id = customerInfo.custometrId
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
            message:"Unauthorizaed user detect"
        })
    }
}