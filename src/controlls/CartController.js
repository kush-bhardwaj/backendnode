const cartModel = require('../model/CartModel');
exports.AddCart = async (req, res, next) => {
    const CartDetails = {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    const cartData = await cartModel.create(CartDetails);
    if (cartData) { res.end("thank you") }

}

exports.getCarts = async function (req, res, next) {
    try {
        const query = { _id: req.params.id }
        console.log(query)
        const resData = await cartModel.Aggregate([
            {
                $lookup: {
                    from: 'product',
                    localField: "_id",
                    foreignField: "productId",
                    as: "data"
                }
            }
        ])
        if(resData){
            res.json({
                status:'success',
                data:resData
            })
        }
    } catch (err) { }
}