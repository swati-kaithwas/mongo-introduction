const express = require("express");

const connect = require("./configs/db");

// const User =require("./models/user.model");
// const Student =require("./models/student.model");
// const Evaluation =require("./models/evaluation.model");

  const app = express();

app.use(express.json());


const userscontrollers = require("./controllers/users.controllers");
const studentscontrollers = require("./controllers/students.controllers");
const evaluationscontrollers = require("./controllers/evaluations.controllers");
  
     app.use("/users",userscontrollers);
     app.use("/students",studentscontrollers);
     app.use("/evaluations",evaluationscontrollers);
     module.exports = app;
   
    
    

