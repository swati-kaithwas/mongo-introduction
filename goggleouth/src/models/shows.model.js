// timing
// movie ( references the movies collection )
// total_seats
// screen ( references the screens collection )






const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const showSchema = new Schema(
  {
      timing:{type: String,required: true},
    movie: [{ type: String, required: true }],
    total_seats: [{ type: String, required: true }],
    screen:  [{ type: String, required: true }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model("show", showSchema); 