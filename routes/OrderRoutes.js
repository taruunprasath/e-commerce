const OrderController =require("../controllers/OrderController");
const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/Auth");

router.post("/",auth, OrderController.createOrder);

module.exports = router;