const ProductController = require("../controllers/ProductController")
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/Auth');

router.get("/",auth,ProductController.getProducts);
router.post("/",ProductController.createProduct);

module.exports = router;