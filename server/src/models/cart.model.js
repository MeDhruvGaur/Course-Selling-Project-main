import mongoose from "mongoose";


const cartSchema = new mongoose.Schema(
    {
        courses: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                }
            }
        ]
    },{timestamps:true}
);




export const Cart = mongoose.model("Cart", cartSchema);