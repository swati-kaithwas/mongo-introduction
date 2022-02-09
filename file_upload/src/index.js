const express =require("express");
const mongoose = require("mongoose");
const connect = require("./configs/db");


const app = express();
app.use(express.json());

module.exports = app;

