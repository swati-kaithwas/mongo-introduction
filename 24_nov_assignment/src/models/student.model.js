const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        student_id:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: false,
        },
        ],
        user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        },
        },
        {
        versionKey:false,
        timestamp: true,
 }
        );

        module.exports = mongoose.model("student", studentSchema);

        
