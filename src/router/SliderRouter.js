const express = require('express');
const { AddSlider, GetAllSliders, deleteSlider } = require('../controlls/SliderController');
const upload = require('../middleware/UploadMiddleWear');
// const { AuthMiddleWare } = require('../middleware/AuthMiddleware');
const SliderRouter =express.Router();
// SliderRouter.use(AuthMiddleWare)
SliderRouter.post('/addSlider',upload.single("image"),AddSlider);
SliderRouter.get('/getSlider',GetAllSliders)
SliderRouter.delete('/deleteSlider/:id',deleteSlider)
module.exports = SliderRouter;