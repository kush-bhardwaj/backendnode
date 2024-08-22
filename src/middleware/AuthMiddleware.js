require("dotenv")
const jsonToken = require('jsonwebtoken');
 
exports.AuthMiddleWare = async(req, res, next)=>{
    try{
        const authToken = req.headers['authorization'].split(' ')[1]
        const userInfo = jsonToken.verify(authToken,process.env.SECRET_KEY);
        if(userInfo){
            req.user_id = userInfo.userId
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
            message:"Unauthorized user detect",
            error:err
        })
    }
}