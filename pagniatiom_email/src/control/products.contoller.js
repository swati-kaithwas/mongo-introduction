const express = require("express");
const Product = require("../models/product.model")

const router = express.Router();

router.post("",async (req, res) => {

    try {
        const product = await Product.create(req.body);
console.log(product);
        return res.status(201).json({ product });
    }catch (e) {
        return res.status(500).json({status: "failed",message: e.message });
    }

});

router.get("",async (req, res) => {
    try {
        const products = await Product.find().lean().exec();

        return res.send(products);
    }catch (e) {
        return res.status(500).json({status: "failed",message: e.message });
    }

});

module.exports = router;