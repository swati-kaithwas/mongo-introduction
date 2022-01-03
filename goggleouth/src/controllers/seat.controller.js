const express = require("express");

const Seat = require("../models/seats.model");

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

      const seat = await Seat.create({
        show: req.body.show,
       
      });

      return res.status(201).json({ seat });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const seats = await Seat.find().lean().exec();

  return res.send(seats);
});



module.exports = router;
