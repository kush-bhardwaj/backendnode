require('dotenv').config()
const jsonToken = require('jsonwebtoken')
const AdminAccModel = require('../model/AddminAccountModel')
const { genPassword, commparePassowrd } = require('../utils/EncrypPassword')
exports.signup = async function (req, res, next) {
    try {
        const signupData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:genPassword(req.body.password),
        }
        const resData = await AdminAccModel.create(signupData)
        // console.log(resData.password)
        if (resData) {
            res.json({
                status: "success",
                message: "admin signup success",
                data: resData
            })
        }
        else {
            res.json({
                status: "failed",
                message: "unable to signup success"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "someting went wrong || Email is already register",
            error: err

        })
    }
}

exports.login = async function (req, res, next) {
    try {
        const loginData = req.body;
        console.log(loginData)
        const query = {email:loginData.email}
        
        
        const resData = await AdminAccModel.findOne(query)

        // console.log("res", resData)
        const SecretKey = process.env.SECRET_KEY;
        // console.log("res", SecretKey)

        if (resData) {
            if (commparePassowrd(loginData.password ,resData.password )) {
               
                const payload ={
                    name:resData.name,
                    email:resData.email,
                    userId:resData._id
                }
                const userToken = await jsonToken.sign(payload,SecretKey,{expiresIn:"15d"})
                console.log("hiiiiii222")
                res.json({
                    status: "success",
                    message: "login successfull",
                   token:userToken
                })
            } else {
                res.json({
                    status: "failed",
                    message: 'unable to login'
                })
            }
        }

    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to login yout account please  check carefully... good day ||",
            error:err
        })
    }
}

//login changes api
exports.loginChange = async function (req, res, next){
    const loginInfo = req.body;
    const query ={$and:[{email:loginInfo.email}]}
    if(loginInfo.email===query){

    }
    // const resData = await AdminAccModel.updateOne(query)
}