require('dotenv').config()
require('../db/MySql')
const MySql = require('../db/MySql')
const jswonwebtoken = require('jsonwebtoken');
const CustomerModel = require('../model/CustomerAccountModel');
const { genPassword, commparePassowrd } = require('../utils/EncrypPassword');
const VerifyAccount = require('../utils/Mail')
exports.signup = async (req, res, next) => {
    try {
        const signupData = {
            custumerName: req.body.name,
            custumerEmail: req.body.email,
            custumerPassword: genPassword(req.body.password),
            custumerMobile: req.body.mobile
        }
        // console.log(signupData)
        const resData = await CustomerModel.create(signupData)
        if (resData) {
            const sentHTML = `<html>
                    <body>
                            <h1>${resData.custumerName}</h1>
                            <p>Welcome ${resData.custumerName}</p>
                            <span>click on link to verify <a href='http://192.168.0.8:5000/api/auth/customer/verify/${resData._id}'>Verify here<a/></span>
                    </body>
            </html>`
            VerifyAccount(resData.custumerEmail,"Signup Success" , " " , sentHTML)
            res.json({
                status:"success",
                message:"signup successfull",
                message:"Check your mail for verify your account"
            })
        }else{
            res.json({
                status:"failed",
                message:"check your email and password"
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
    try {
        const logingInfo = req.body;
        // console.log(logingInfo.password)
        // console.log(logingInfo.email)
        const find = {
            $and: [{ custumerEmail: logingInfo.email },{customer_status:1}]
        }
        // console.log(find)
        const resData = await CustomerModel.findOne(find);
        // console.log(resData.custumerEmail)
        const secretKey = process.env.SECRET_KEY;
        // console.log(secretKey)
        if (resData) {
            if (commparePassowrd(logingInfo.password, resData.custumerPassword)) {
                // console.log("hello")
                payload = {
                    name: resData.custumerName,
                    email: resData.custumerEmail,
                    customerId: resData._id
                }
                // console.log(payload)
                const CustomerToken = await jswonwebtoken.sign(payload, secretKey, { expiresIn: "15d" })
                
                // console.log("customerToken",CustomerToken)
                res.json({
                    status: 'success',
                    message: "login successfull",
                    token: CustomerToken
                })
            }
            else {
                res.json({
                    status: "failed",
                    message: "unable to login"
                })
            }
        }
        else {
            res.json({
                status:"failed",
                message:"Account not verified"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "Unable to Loginnn",
            error: err
        })
    }
}

exports.verifyCustomer = async (req, res, next) => {
    try {
        const query = { id: req.params.id }
        // console.log(query)
        const updateData = await CustomerModel.updateOne(query._id, { customer_status: 1 });
        if (updateData) {
            res.json({
                name: "success",
                message: 'verify success'
            })
        } else {
            res.json({
                status: "faild",
                message: "unable to failed verify check your details"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to verify"
        })
    }
}
