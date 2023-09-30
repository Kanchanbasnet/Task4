const express = require('express');
const{getProducts, getProduct, createProduct, updateProduct, deleteProduct, updateQuantity,outOfStock} = require('../controllers/productController.js');

const productRouter = express.Router();

productRouter.get('/',getProducts);
productRouter.get('/:id',getProduct);
productRouter.post('/',createProduct);
productRouter.put('/:id',updateProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.patch('/:id',updateQuantity);
productRouter.get('/outOfStock',outOfStock);


module.exports = productRouter;













module.exports= productRouter;