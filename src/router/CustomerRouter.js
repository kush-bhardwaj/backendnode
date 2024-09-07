const express = require('express');
const { signup, login, verifyCustomer } = require('../controlls/CustomerAccControler');
const CustumerRouter = express.Router();
CustumerRouter.post('/signup',signup);
CustumerRouter.post('/login',login);
CustumerRouter.get('/verify/:id',verifyCustomer)
module.exports = CustumerRouter;