const express = require('express');
const { addNotification, deleteNotification, getAllNotification } = require('../controlls/NotificationController');
const { AuthMiddleWare } = require('../middleware/AuthMiddleware');
const NotificationRouter = express.Router()
NotificationRouter.use(AuthMiddleWare)
NotificationRouter.post('/addNotification',addNotification)
NotificationRouter.delete('/deleteNotification/:id',deleteNotification)
NotificationRouter.get('/getAllNotification',getAllNotification)
module.exports = NotificationRouter;