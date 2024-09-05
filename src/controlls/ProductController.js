const ProductModel = require("../model/ProductModel")
const ImageModel = require("../model/UploadModel")
const { ObjectId } = require("mongodb")
//addProduct completed 👍
exports.addProduct = async function (req, res, next) {
    try {
        const product = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCurrency: req.body.productCurrency,
            productUnit: req.body.productUnit,
            productRating: req.body.productRating,
            productFeedback: req.body.productFeedback,
            productStock: req.body.productStock,
            productInstock: req.body.productInstock,
            productCat_Id: req.body.productCat_Id,
            productSubCatId: req.body.productSubCatId,
            productDescription: req.body.productDescription,
            productTitle: req.body.productTitle,
            productImg: req.imagePath,
            // productImg:req.imagePath,
            // productImg:req.imagePath,
            // productImg:req.imagePath
        }
        const productData = await ProductModel.create(product)
        if (productData) {
            res.json({
                status: "success",
                message: "your added"
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to add product."
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong",
            error: err
        })
    }
}

//getAllProduct completed 👍
exports.getAllProducts = async function (req, res, next) {
    try {
        const pageNo = req.query.pageno
        // console.log(pageNo)
        const limit = 5;
        var totalCount = await ProductModel.find().count();
        const totalPage = Math.ceil(totalCount / limit)

        if (pageNo <= totalPage) {
            var offset = (pageNo - 1) * limit
            const getProduct = await ProductModel.find({}).skip(offset).limit(limit)
            if (getProduct) {
                res.json({
                    status: "success",
                    message: "products find successfull",
                    data: getProduct,
                    pages: totalPage
                })
            } else {
                res.json({
                    status: "faild",
                    message: "faild to fetch products"
                })
            }
        }

    } catch (err) {
        res.json({
            status: "fail",
            message: "unable to find Products",
            error: err
        })
    }
}

//getProdut By Id

exports.getProductById = async (req, res, next) => {
    const query = { _id: req.params }
    const find = { $and: [{ productCat_Id: new ObjectId(query._id) }] }
    const findData = await ProductModel.find(find)
    if(findData){
        res.json({
            status:"success",
            message:"get all prducts by id",
            data:findData
        })
    }
}

//getProduct by id end
//delete Product completed 👍
exports.deleteProduct = async function (req, res, next) {
    try {
        const query = { _id: req.params._id }
        const deleteRes = await ProductModel.deleteOne(query._id)
        if (deleteRes) {
            res.json({
                status: "success",
                message: "product delted"
            })
        } else {
            res.json({
                status: "faild",
                message: "failed to delete product"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to delete"
        })
    }
}

//update product complete 👍
exports.updateProduct = async function (req, res, next) {
    try {
        const query = { _id: req.params.id }
        console.log(query)

        // console.log("request body",req.body)
        const updateData = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCurrency: req.body.productCurrency,
            productUnit: req.body.productUnit,
            productRating: req.body.productRating,
            productFeedback: req.body.productFeedback,
            productStock: req.body.productStock,
            productInstock: req.body.productInstock,
            productCat_Id: req.body.productCat_Id,
            productSubCatId: req.body.productSubCatId,
            productDescription: req.body.productDescription,
            productTitle: req.body.productTitle,
            productImg: req.imagePath
        }
        // console.log(updateData)
        const updateRes = await ProductModel.updateOne(query, updateData)
        console.log("updateres", updateRes)
        if (updateRes) {
            res.json({
                status: "success",
                message: "product updated"
            })
        } else {
            res.json({
                status: "failed",

                message: "unable to update product please update carefully"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to update Product",
            error: err
        })
    }
}


//single  product compelted👍

exports.singleProduct = async function (req, res, next) {
    try {
        const query = {productTitle : req.params.name };
        // console.log("single product id", query)
        const singleRes = await ProductModel.findOne(query)
        if (singleRes) {
            res.json({
                status: "success",
                message: "product find success",
                data: singleRes
            })
        } else {
            res.json({
                status: "failed",
                messge: "unable to find product please check your details"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong to find data"
        })
    }
}


//upload images

exports.uploadImage = async function (request, response, next) {
    try {
        const Imageupload = {
            productId: request.body.productId,
            image: request.imagePath,
        }
        console.log("image data", Imageupload)
        const resData = await ImageModel.create(Imageupload)
        // console.log(resData)
        if (resData) {
            response.json({
                status: "success",
                message: "upload done !!"
            })
        } else {
            response.json({
                status: "failed",
                message: "cannot upload Image"
            })
        }
    } catch (err) {
        response.json({
            status: "failed",
            message: "unable to upload  file!!",
            error: err
        })
    }
}

exports.productImageAggregate = async function (req, res, next) {
    try {
        const productId = req.params.id;
        console.log(productId)
        const resData = await ProductModel.aggregate([
            // stage1 match
            { $match: { _id: new ObjectId(productId) } },
            //stage2 lookup
            {
                $lookup: {
                    from: "uploads",
                    localField: "_id ",
                    foreignField: "productId",
                    as: "productImages"
                }
            }
        ])
        // console.log(resData)
        if (resData) {
            res.json({
                status: "success",
                messgae: "join succes",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "upload failed"
            })
        }
    } catch (err) {
        res.json({
            status: "failed",
            message: "something went to upload images",
            error: err
        })
    }
}

//search product //

exports.searchProduct = async function (req, res, next) {
    try {
        const searchData = { name: req.query.name };
        // console.log(searchData)
        const findData = { productName: { $regex: `^${searchData.name}`, $options: "i" } }
        // console.log(findData)
        let resData = await ProductModel.find(findData);

        if (resData.length == 0) {
            const findData = { productTitle: { $regex: `^${searchData.name}`, $options: "i" } }
            resData = await ProductModel.find(findData);

        }
        if (resData) {
            res.json({
                status: "success",
                message: "find success",
                data: resData
            })
        } else {
            res.json({
                status: "failed",
                message: "unable to find product",
            })
        }
    } catch (err) {
        res.json({
            status: "faild",
            message: "something went wrond to find products..",
            error: err
        })
    }
}


//search product end//


//profuct with category and subcategory
// exports.prodctCatSubcat = async (req, res , next)=>{
//     const id = req.params.id;
//     const join = await ProductModel.aggregate([
//         //join categotry inside product
//         {$loogup:{
//             form:"categories",
//             localField:"_id",
//             foreignField:"productId",
//             as:"category"
//         }}
//     ])
// }