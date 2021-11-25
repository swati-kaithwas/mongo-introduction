const express=require("express");
//console.log(express);

const app=express();
app.get("/", (req, res) => {
    
    res.send("<h1>Welcome to Home page</h1>");
});

app.listen(1345,function() {
console.log("listening on port 1345");
}); 


