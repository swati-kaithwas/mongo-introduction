const express = require ("express");
const { body, validationResult } = require('express-validator');

const User = require("../models/user.model");

const router = express.Router();


router.post("/",
body("first_name").isLength({min: 4, max:20}).withMessage("First name has to be at least 4 characters and maximum 20 characters"),
body("last_name").isLength({min: 4, max:20}).withMessage("last  name has to be at least 4 characters and maximum 20 characters"),
body("pincode").isLength({min:6}).withMessage("required and should be exactly 6 numbers"),
body("gender").isLength({min: 4, max:6}).withMessage(" required and should be either Male, Female or Others"),
// body("email").  isEmail({options?: IsEmailOption})

 body("age").custom((value)=> {
     const isNumber =/^[0-9]*$/.test(value)
     if(!isNumber||(value<=0)&&(value>100)){
    throw new Error("required and should be between 1 and 100")
}
return true;
 }),

 body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,20}$/.test(value);
    // const listOfDomains =["gmail.com", "yahoo.com"]
    // const email = value.split("@");
    // if(!listOfDomains.includes(email[1])) {
    //     throw new Error("we do not accept emails from this domain");
    // }
    if(!isEmail){
   throw new Error("required and should be a valid email");
}
const userByEmail = await User.findOne({ email:value})
.lean()
.exec();
if (userByEmail){
    throw new Error ("Please try with a different email address");
}
return true;
}),


async (req, res) => {
    // console.log(body("first_name"));
    const errors = validationResult(req);//[]
    if (!errors.isEmpty()) {
        let newErrors = errors.array().map(({msg, param, location}) => {
            return {
                [param]: msg,
            };
        });
           
      return res.status(400).json({ errors: newErrors});
    }
    try{
        const user = await User.create(req.body);
        return res.status(201).json({ user });

    }catch(e) {
        return res.status(500).json({ status: "failed",message: e.message })
    }
});





// router.post("/",body("first_name").notEmpty(),async (req, res) => {
//     console.log(body("first_name"));
//     const errors = validationResult(req);//[]
//     if (!errors.isEmpty()) {
        
           
//       return res.status(400).json({ errors: errors.array()});
//     }
//     try{
//         const user = await User.create(req.body);
//         return res.status(201).json({ user });

//     }catch(e) {
//         return res.status(500).json({ status: "failed",message: e.message })
//     }
// });
module.exports = router;