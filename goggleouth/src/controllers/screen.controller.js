const express = require("express");

const Screen = require("../models/screens.model");

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

      const screen = await Screen.create({
        name: req.body.name,
        threatre: req.body.threatre,
      
      });

      return res.status(201).json({ screen });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const screens = await Screen.find().lean().exec();

  return res.send(screens);
});



module.exports = router;
