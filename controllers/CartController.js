const Cart = require("../models/CartModel");

exports.createCart = async(req,res) =>{
    const {user_id} = req.user
    const {product_id, quantity} = req.body
    let cart = await Cart.findOne({user_id})

    if(!cart){
        cart = new Cart({
            user_id,
            products:[
                {
                    product_id,
                    quantity,
                },
            ],
        });
    }else{
        const ProductIndex = cart.products.findIndex((prod) => prod.product_id === product_id);
        if (ProductIndex === -1) {
            cart.products.push({ product_id, quantity });
        } else {
            cart.products[ProductIndex].quantity += quantity;
        }
        
}
    cart.save();
    res.status(200).json({message: "Product added/updated in cart", cart});
    
};

exports.getCart = async (req, res) => {
    try {
        let subTotal = 0;
        const { user_id } = req.user;
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(200).json({ message: "Cart is not found!" });
        }

        const cartItems = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({id :product.product_id,});
                subTotal += productDetails.price * product.quantity;
                return {
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    quantity: product.quantity,
                    image: productDetails.image,
                    total: productDetails.price * product.quantity
                };
            })
        );

        res.status(200).json({cartItems, subTotal });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteCart = async(req,res) =>{
    const{user_id} = req.user;
    const {product_id} = req.params;
    try{
        if(!user_id){
            res.status(200).json({message: "User Not Found"});
        }
    const cart = await Cart.findOne({user_id});

    const isProductValid = cart.products.find((product) => product_id === product.product_id);

    if(!isProductValid){
        return res.status(200).json({message: "Product not found in cart"});
    }

    if(cart.products.length == 1){
        await Cart.deleteOne({user_id});
        return res.status(200).json({message: "Product is removed from the cart"})
    }

    if(!cart){
        res.status(200).json({message: "Cart is not found!"});
    }

    cart.products =cart.products.filter((prod)=> prod.product_id != product_id);
    await cart.save();
    return res.status(401).json({message:"Cart deleted successfully"});
    }catch(err){
        console.log(err);
    }
}