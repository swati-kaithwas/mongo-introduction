const express = require("express");

const users = require("./users.json");
//console.log(express);
const app = express();
app.get("/",(req,res) => { 
    res.send({users});
});


app.listen (2395, function() {
    console.log("listening on port 2395");
});