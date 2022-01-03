const express = require("express");

const Theatre = require("../models/theatres.model");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const router = express.Router();


router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const theatre = await Theatre.create({
        name: req.body.name,
        location: req.body.location,
       
     
      });

      return res.status(201).json({  theatre });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const  theatres = await  Theatre.find().lean().exec();

  return res.send( theatres);
});



module.exports = router;
