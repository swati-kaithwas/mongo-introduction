// name
// actors ( array )
// languages ( array )
// directors ( array )
// poster_url ( image_url of the poster )



const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
      name:{type: String,required: true},
    actors: [{ type: String, required: true }],
   languages: [{ type: String, required: true }],
    directors: [{ type: String, required: true }],
    profile_photo_url: [{ type: String, required: true }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



module.exports = model("movie", movieSchema); 
