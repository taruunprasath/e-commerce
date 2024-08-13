const CartController = require("../controllers/CartController");
const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/Auth");

router.post('/',auth, CartController.createCart);
router.get('/', auth ,CartController.getCart);
router.delete('/:product_id',auth,CartController.deleteCart);

module.exports = router;