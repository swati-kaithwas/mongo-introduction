const express = require("express");
//console.log(express);
const users = require("./users.json");
const app = express();
//in.get res.send ({users});


// const app=express();
app.use(express.json());

app.get("/", (req, res) => {
    
    res.send({users});
});

app.listen(1348,function() {
console.log("listening on port 1348");
}); 