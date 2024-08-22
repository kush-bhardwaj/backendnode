const express = require('express');
const { signup, login } = require('../controlls/CustomerAccControler');
const CustumerRouter = express.Router();
CustumerRouter.post('/signup',signup);
CustumerRouter.post('/login',login)
module.exports = CustumerRouter;