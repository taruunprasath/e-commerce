const ProductController = require("../controllers/ProductController")
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/Auth');

router.get("/",ProductController.getProducts);
router.post("/",ProductController.createProduct);

module.exports = router;