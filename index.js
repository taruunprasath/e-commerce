const express = require("express");
const app = express();
const productsRoutes = require("./routes/ProductRoutes");
const userRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require("./routes/OrderRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/backend').then(()=>{
console.log("Connected sucessfully");
});

app.use('/products',productsRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

app.listen(3000, () => {
   console.log("Server is running") ;
})