const mongoose = require('mongoose');


const evaluationSchema = new mongoose.Schema(
    {
      date: { type: String, required: true },
      instructor: { type: String, required: false },
      topic: { type: String, required: true, unique: true },
   
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  module.exports = mongoose.model("evaluation", evaluationSchema); 
       

