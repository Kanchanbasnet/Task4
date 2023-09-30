const user = require('../models/userModel.js');

exports.getUsers = async(req,res)=>{
    try{
        const users = await user.find();
        if(!users){
            res.status(404).send("User not found.");
        }
        res.status(200).send(users);


    }catch(error){
        console.error(`Internal Server Error.`);

    }

}
exports.getById = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await user.findOne({_id:id});
        if(!userExist){
            return res.status(404).send("User does not exists.");
        }
        return res.status(201).send(userExist);

    }
    catch(error){
        console.error(`Internal Server Error.`);
    }
}

exports.createUser = async(req,res)=>{
    try{
        const userData = new user(req.body);
        //to find in the database if the user exists or not.
        const {email} = userData;
        const userExist = await user.findOne({email});
        if(userExist){
            return res.status(404).send(`User already exist.`)
        }
        const createUser = await userData.save();
        res.status(200).send(createUser);


    }catch(error){
        console.error(`Internal Server Error.`);

    }
}

exports.updateUser = async(req,res) =>{
    try{
        const id = req.params.id;
       
        const userExist = await user.findOne({_id:id});
        
        if(!userExist){
            return res.status(404).send("User does not exist");
        }
        const updateUser = await user.findByIdAndUpdate(id, req.body,{new:true});
        res.status(201).send(updateUser);


    }
    catch(error){
        console.error(`Internal Server Error.`);

    }
}
exports.deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await user.findOne({_id:id});
        

        if(!userExist){
            return res.status(404).send("user does not exist");
        }
        
         await user.findByIdAndDelete(id);
        res.status(201).send("User Deleted successfully.")

    }
    catch (error){
        console.error(`Internal Server Error.`); 
    }
}