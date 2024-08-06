const SliderModel = require('../model/SliderModel')
exports.AddSlider = async (req,res, next)=>{
   try{
    const data ={
        image:req.imagePath
    }
    console.log("image",data)
    const resData = await SliderModel.create(data);
    if(resData){
        res.json({
            status:"success",
            message:"slider add successFull",
            sliderData:resData
        })
    }else{
        res.json({
            status:"failed",
            message:"unable to add data"
        })
    }
   }catch(err){
    res.json({
        status:"failed",
        message:"something went wrong to add slider"
    })
   }
}

//get Slidetr image

exports.GetAllSliders = async(req, res, next)=>{
   try{
    const getSlider = await SliderModel.find({});
    if(getSlider){
        res.json({
            status:'success',
            message:"slider find success",
            data:getSlider
        })
    }else{
        res.json({
            status:"failed",
            message:'unable to find slider'
        })
    }
   }catch(err){
    res.json({
        status:'failed',
        message:'somethng went wrong to get Sliders',
        error:err
    })
   }
}
//get Slidetr image end