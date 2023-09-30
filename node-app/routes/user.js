const express = require('express');
const {getById, getUsers, createUser,updateUser, deleteUser} = require("../controllers/userController.js");

const userRouter = express.Router();


userRouter.get("/:id",getById);
userRouter.get("/",getUsers);
userRouter.post("/",createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id",deleteUser);


module.exports = userRouter;

