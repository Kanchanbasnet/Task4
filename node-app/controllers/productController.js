const product = require('../models/productModel.js');



exports.getProducts = async (req,res)=>{
    try{
        const products = await product.find();
        if(!products){
            return res.status(404).send("Product does not exists");
        }
        return res.status(200).send(products);

    }
    catch(error){
        console.error(`Internal Server Error.`);
        res.send("Internal servr error.");

    }
}
exports.outOfStock= async (req,res)=>{
    try{
        const outOfStock = await product.find({quantity:{$lt:5}});
        return res.status(400).send(outOfStock);

    }
    catch(error){
        res.send(error);
    }
}
exports.getProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product Exist.');
        }
        return res.status(200).send(productExist);
    }
    catch(error){
        res.send(error);
    }

}

exports.createProduct = async(req,res)=>{
    try{
        const newProduct =new product(req.body);
        const productExist = product.findOne({productName:newProduct.productName});
        if(!productExist){
            return res.status(404).send("Product exists");
        }
        const createProduct = await newProduct.save();
        return res.status(404).send(createProduct);

    }
    catch(error){
        console.error(error);
        res.send(error);


    }
}
exports.updateProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.')
        }
        const updateProduct= await product.findByIdAndUpdate(id, req.body, {new:true});
        return res.status(200).send(updateProduct);

    }
    catch(error){
        
        res.send(error);


    }
}
exports.updateQuantity= async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.');
        }
        const updateQuantity = {quantity: req.body.quantity || product.quantity};
        const updatedQuantity = await product.findByIdAndUpdate(id, updateQuantity, {new:true});
        return res.status(200).send(updatedQuantity);

    }
    catch(error){
        
        res.send(error);
    }
}
exports.deleteProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const productExist = await product.findOne({_id:id});
        if(!productExist){
            return res.status(404).send('Product does not exist.')
        }
        await product.findByIdAndDelete(id);
        res.status(404).send("Product Deleted Successfully.");
    }
    catch(error){
        
        res.send(error);
    }
}