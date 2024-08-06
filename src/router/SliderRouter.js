const express = require('express');
const { AddSlider, GetAllSliders } = require('../controlls/SliderController');
const upload = require('../middleware/UploadMiddleWear');
const { AuthMiddleWare } = require('../middleware/AuthMiddleware');
const SliderRouter =express.Router();
SliderRouter.use(AuthMiddleWare)
SliderRouter.post('/addSlider',upload.single("image"),AddSlider);
SliderRouter.get('/getSlider',GetAllSliders)
module.exports = SliderRouter;