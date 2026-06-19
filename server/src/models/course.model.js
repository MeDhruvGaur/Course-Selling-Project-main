import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
{
    title: {type:String, required:true},
    description: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:Number, required:true},
    features: {type:String, required:true},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
},
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);