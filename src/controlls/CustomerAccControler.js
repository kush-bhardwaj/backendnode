require('dotenv').config()
const jswonwebtoken = require('jsonwebtoken');
const CustomerModel = require('../model/CustomerAccountModel');
const { genPassword, commparePassowrd } = require('../utils/EncrypPassword');
exports.signup = async (req, res, next) => {
    try {
        const signupData = {
            custumerName: req.body.name,
            custumerEmail: req.body.email,
            custumerPassword: genPassword(req.body.password),
            custumerMobile: req.body.mobile
        }
        const resData = await CustomerModel.create(signupData)
        if (resData) {
            res.json({
                status: 'success',
                message: "signup successfull",
                data: resData
            })
        }
        else {
            res.json({
                status: 'failed',
                message: "failed to singup"
            })
        }
    }
    catch (err) {
        if (err.custumerName === 'ValidationError') {
            res.json({
                status: "faild",
                message: "name must be greater 4"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "unable to signup",
                error: err
            })
        }
    }
}

exports.login = async (req, res, next) => {
   try{
    const logingInfo = req.body ;
    console.log(logingInfo.password)
    const find={
        $and:[{custumerEmail:logingInfo.email}]
    }
    
    const resData = await CustomerModel.findOne(find);
    // console.log(resData)
    const secretKey = process.env.SECRET_KEY;
    // console.log(secretKey)
    if(resData){
        if(commparePassowrd(logingInfo.password,resData.custumerPassword)){
                payload={
                    name:resData.custumerName,
                    email:resData.custumerEmail,
                    custometrId :resData._id
                }
                const CustomerToken = await jswonwebtoken.sign(payload,secretKey,{expiresIn:"15d"},Timestamp)
                res.json({
                    status:'success',
                    message:"login successfull",
                    token:jswonwebtoken.decode(CustomerToken)
                })
        }
        else{
            res.json({
                status:"failed",
                message:"failed to login"
            })
        }
    }
    else{
        
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"unable to login",
        error:err
    })
   }
}