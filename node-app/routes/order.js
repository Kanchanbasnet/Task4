const express = require('express');
const {viewcart, getOrderById, addToCart, checkout, getOrder}= require('../controllers/OrderController.js');

const orderRouter = express.Router();
orderRouter.get('/', getOrder);
//orderRouter.post('/addToCart',addToCart);
//orderRouter.post('/checkout',checkout);
orderRouter.get('/viewcart/:id',viewcart);
orderRouter.get('/:id',getOrderById);




module.exports = orderRouter;
