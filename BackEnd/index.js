const express = require('express');
const app = express();
const bodyParser = require('body-parser') // middleware
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const productRouter = require('./Routes/productRouter')
const UsersRouter = require('./Routes/UsersRouter')
const OrderRouter = require("./Routes/OrderRouter")



require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT;

app.get('/hey',(req,res)=>{
    res.send('hello')
});

app.use(bodyParser.json());
app.use(cors())
// Users
app.use('/auth',AuthRouter)
// app.use('/products',productRouter)

// admin
app.use('/users',UsersRouter)

// Products
app.use("/products",productRouter)

// Order Items
app.use("/items",OrderRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})