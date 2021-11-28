const express = require("express");

const users = require("./users.json");
const app = express();
app.use(express.json());
//console.log(express);

app.get("/",(req,res) => { 
    res.send("home pages");

});

app.get("/users",(req,res) => {
    res.send({users});
})


app.post("/",(req,res) => { 
    const newUsers = [...users,req.body]
    //console.log(req.body);
    res.send(newUsers);
});

// app.patch("/:id/:movie_genre",(req,res) => { 
  
//     console.log(req.params);
//     console.log(req.params.id);
//     console.log(req.params.movie_genre);
//     res.send("patch");
// });
app.patch("/:movie_name", (req,res) => { 
let a={};
a.name = "swati";
    console.log(req.params.movie_name);
    const newUsers=users.map((user) => {
        if(req.params.movie_name === user.movie_name) {
            return req.body;
        // if(req?.body?.movie_name) user.movie_name = req.body.movie_name;
        }
        a.name="xyz";
        return user;
    });
    res.json({newUsers,a});
});

app.delete("/:movie_name",(req,res) => {
    const newUsers = users.filter ((user) => user.movie_name !== req.params.movie_name);

    res.send(newUsers);
});

app.get("/:movie_name",(req,res) => {
    const newUsers = users.filter ((user) => user.movie_name === req.params.movie_name);

    res.send(newUsers);
});

app.listen (2395, function() {
    console.log("listening on port 2395");
});


