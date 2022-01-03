// show ( references the shows collection )







const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const seatSchema = new Schema(
  {
      
  show: [{ type: String, required: true }],
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



module.exports = model("seat", seatSchema); 