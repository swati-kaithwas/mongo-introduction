const express = require("express");

const Show = require("../models/shows.model");

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

      const show = await Show.create({
        timing: req.body.timing,
        movie: req.body.movie,
        total_seats: req.body.total_seats, 
        screen: user.screen,
      });

      return res.status(201).json({ show });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const shows = await Show.find().lean().exec();

  return res.send(shows);
});




module.exports = router;
