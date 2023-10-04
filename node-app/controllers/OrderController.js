const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");



exports.checkout = async (req,res)=>{
  try{
    const cartId = req.params.id;
    const cartExist = await Cart.findOne({cartId});
    if(cartExist.price>500){
      const newOrder = {
        userId: cartExist.userId,
        cartId,
        items: cartExist.items,
        price:cartExist.price
      }
      await Cart.findByIdAndRemove(cartId);
      await Order.create(newOrder);
      res.status(200).send("Order generated Successfully.");

    }
    else{
      res.send({message:"Minimum order for checkout is 500."});
    }

  }
  catch(error){
    console.log(error);
    res.status(500).send({Error: 'Internal Server Error.'});
  }
}



exports.getOrder = async (req,res) =>{
  try{
      const orders = await Order.find({}).populate('userId').populate('items.productId')
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
      const orderId = req.params.id;
      const getOrder = await Order.findById(orderId)
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









