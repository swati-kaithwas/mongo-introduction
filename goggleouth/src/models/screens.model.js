// name
// threatre ( references the theatres collection )

const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const screenSchema = new Schema(
  {
      name:{type: String,required: true},
    threatre: [{ type: String, required: true }],
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



module.exports = model("screen", screenSchema); 