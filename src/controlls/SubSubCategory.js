const SubSubCatModel = require("../model/SubSubCategoryModel")
//add sub subcategory 
exports.addsubsubcat = async (req, res, next) => {
    try {

        const addData = {
            subsubcatname: req.body.subsubcatname,
            subsubcattitle: req.body.subsubcattitle,
            subcatid: req.body.subcatid,
        }
        const resData = await SubSubCatModel.create(addData);
        if (resData) {
            res.json({
                status: "success",
                message: "subcategory add inside subcategory",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to add"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to add"
        })
    }
}

//get all sub subcategory
exports.getallsubsubcat = async (req, res, next) => {
    try {
        const resData = await SubSubCatModel.find({})
        if (resData) {
            res.json({
                status: "success",
                message: "all sub subcategory find success",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to fetch data"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong please retry !!"
        })
    }
}

//update sub subcategory 
exports.updatesubsubcat = async (req, res, next) => {
    try {
        const query = { _id: req.params.id };
        const updateData = {
            subsubcatname: req.body.subsubcatname,
            subsubcattitle: req.body.subsubcattitle,
        }
        const resData = await SubSubCatModel.updateOne(query, updateData);
        if (resData) {
            res.json({
                status: "success",
                message: "update success",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to update data"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong please try again careFully"
        })
    }
}

//delete subsubcategory
exports.deletesubsubcat = async (req, res, next) => {
    try {
        const query = { _id: req.params.id };
        const resData = await SubSubCatModel.deleteOne(query);
        if (resData) {
            res.json({
                status: "success",
                message: "delete success",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to delete data"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong please try again careFully"
        })
    }
}

//single subsubcate
exports.singlesubsubcat = async (req, res, next) => {
    try {
        const query = { _id: req.params.id };
        
        const resData = await SubSubCatModel.findOne(query);
        if (resData) {
            res.json({
                status: "success",
                message: "find success",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to find data"
            })
        }
    }catch(err){
        res.json({
            status:"failed",
            message:"something went wrong please try again careFully"
        })
    }
}

//subsubcat aggregate
