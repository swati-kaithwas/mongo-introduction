const express =require("express");
const mongoose = require("mongoose");
const connect = require("./configs/db");


const app = express();
app.use(express.json());

const productsController = require("./controllers/products.controller");

app.use("/products",productsController);

module.exports = app;

