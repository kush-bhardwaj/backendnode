const express = require('express');
const { signup, login } = require('../controlls/AdmindAccountController');
const AdminAccRouter = express.Router()
AdminAccRouter.post('/signup',signup);
AdminAccRouter.post('/login',login)

module.exports = AdminAccRouter