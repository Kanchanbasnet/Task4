const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/products.js');
const orderRouter = require('./routes/order.js');
const cartRouter = require('./routes/cart.js');

const app = express();
app.use(bodyParser.json());
dotenv.config();



//connect to db
const DBCONNECT = process.env.DBCONNECT;
mongoose.connect(DBCONNECT).then(()=>{
    console.log(`Connected to the Database successfully.`);
    app.listen(3000, ()=>{
        console.log(`The server is running on https://localhost:3000`);
    })
})
.catch((err)=>{
    console.error("Error Connecting to the database.",err);

})

app.use("/users", userRouter);
app.use("/products",productRouter);
app.use("/orders",orderRouter);
app.use("/carts",cartRouter);
app.get('/', (req,res)=>{
    res.send(`Welcome to The Homepage.`);
});





