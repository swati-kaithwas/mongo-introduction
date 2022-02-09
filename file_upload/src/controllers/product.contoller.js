const express = require("express");
const Product = require("../models/product.model");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/",upload.Single("productImages"), async (req, res) => {

    try {
        const product = await Product.create ({
            name: req.body.name,
            price: req.body.price,
            image_urls: req.file.path,
        });

        return res.status(201).json({ product });
    }catch (e) {
        return res.status(500).json({status: "failed",message: e.message });
    }

});


router.post("/multiple",upload.any("image_urls"), async (req, res) => {
 const filePaths = req.files.map(file => file.path);
    try {
        const product = await Product.create ({
            name: req.body.name,
            price: req.body.price,
            image_urls: req.filePaths,
        });

        return res.status(201).json({ product });
    }catch (e) {
        return res.status(500).json({status: "failed",message: e.message });
    }

});
module.exports = router;