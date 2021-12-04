
const app = require("./index");

const connect = require("./configs/db");

app.listen(2553, async function(){
    await connect();
    console.log("listening on port 2553");
});