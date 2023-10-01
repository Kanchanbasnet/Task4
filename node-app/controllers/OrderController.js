const order = require('../models/orderModel.js');
const product = require('../models/productModel.js');
const cart = require('../models/cartModel.js');
const user = require('../models/userModel.js');


exports.viewcart = async (req,res)=>{
    try{
       const cartId = req.params.id;
       const cart = await cart.findOne({_id:cartId}).populate('products.product');
       if(!cart){
        return res.status(404).send("Cart does not exist.");
       }
       return res.status(200).json(cart);




    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error.")
    }
}

/*exports.viewCart = async (req, res) => {
    const userId = req.params.id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
        return res.status(404).send('Cart not found');
    }
    res.status(200).send(cart);
};*/


exports.getOrder = async (req,res) =>{
    try{
        const orders = await order.find().populate('user products.product');
        if(orders.length === 0){
            return res.status(200).send('You have no orders');

        }
        return res.status(200).json(orders);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error.');
    }
    }
    
exports.getOrderById = async (req,res) =>{
    try{
        const id = req.params.id;
        const getOrder = await order.findOne({_id:id}).populate('user products.product');
        if(!getOrder){
            return res.status(404).json('Order id does not exist.');
        }
        res.status(200).send(getOrder);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal server Error');
    }
}
