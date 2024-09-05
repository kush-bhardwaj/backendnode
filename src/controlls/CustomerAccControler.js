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
                            <span>click on link to verify <a href='http://192.168.159.11:5000/api/auth/customer/verify/${resData._id}'>Verify here<a/></span>
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
        console.log(logingInfo.password)
        const find = {
            $and: [{ custumerEmail: logingInfo.email },{customer_status:true}]
        }

        const resData = await CustomerModel.findOne(find);
        const secretKey = process.env.SECRET_KEY;
        if (resData) {
            if (commparePassowrd(logingInfo.password, resData.custumerPassword)) {
                payload = {
                    name: resData.custumerName,
                    email: resData.custumerEmail,
                    custometrId: resData._id
                }
                const CustomerToken = await jswonwebtoken.sign(payload, secretKey, { expiresIn: "15d" }, Timestamp)
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
            message: "Unable to Login",
            error: err
        })
    }
}

exports.verifyCustomer = async (req, res, next) => {
    try {
        const query = { id: req.params.id }
        const updateData = CustomerModel.updateOne(query, { customer_status: true });
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
