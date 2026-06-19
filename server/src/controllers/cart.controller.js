import mongoose from "mongoose";
import { ApiErrorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const addToCart = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user?._id);
    
    const {courseId} = req.body;
       if(!courseId?.trim() || !courseId?.trim()?.length === 0){
        throw new ApiErrorHandler(res, 400, "Course ID is required");
    }
    if(!user){
        throw new ApiErrorHandler(res, 404, "User not found");
    }

    const existingCart = await Cart.findById(user.cart);
    if(!existingCart){
        throw new ApiErrorHandler(res, 404, "Cart does not exist");
    }

    // check if the cart has existing course id
    const existingCourse = existingCart.courses.some((course) => course.course.toString() === courseId);
    if(existingCourse){
        throw new ApiErrorHandler(res, 400, "Course already exists in cart");
    }



    const updatedCart = await Cart.findByIdAndUpdate(existingCart._id, {
        $addToSet: {
            courses: {
                course: courseId,
            },
        },
    }, {new: true});
    
 
    
  
    if(!updatedCart || updatedCart === existingCart){
        throw new ApiErrorHandler(res, 500, "Failed to add course to cart");
    }
    
    return res.status(200).json(new ApiResponse(200, null, "Course added to cart successfully"));
});



const getCart = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ApiErrorHandler(res, 404, "User not found");
    }
    const existingCart = await Cart.findById(user.cart);
    if(!existingCart){
        throw new ApiErrorHandler(res, 404, "Cart does not exist");
    }
    
    // populate the courses
    const populatedCart = await existingCart.populate("courses.course");
    if(!populatedCart || populatedCart?.length === 0){
        throw new ApiErrorHandler(res, 404, "Cart not found");
    }
  

  return res.status(200).json(new ApiResponse(200, existingCart, "Cart fetched successfully"));
})

const removeFromCart = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user?._id);
    const {courseId} = req.params;
       if(!courseId?.trim() || !courseId?.trim()?.length === 0){
        throw new ApiErrorHandler(res, 400, "Course ID is required");
    }
    if(!user){
        throw new ApiErrorHandler(res, 404, "User not found");
    }

    const existingCart = await Cart.findById(user.cart);
    if(!existingCart){
        throw new ApiErrorHandler(res, 404, "Cart does not exist");
    }

    // check if the cart has existing course id
    const existingCourse = existingCart.courses.some((course) => course.course.toString() === courseId);
    if(!existingCourse){
        throw new ApiErrorHandler(res, 400, "Course not found in cart");
    }
    
    const updatedCart = await Cart.findByIdAndUpdate(existingCart._id, {
        $pull: {
            courses: {
                course: courseId,
            },
        },
    }, {new: true});
    
    if(!updatedCart || updatedCart === existingCart){
        throw new ApiErrorHandler(res, 500, "Failed to remove course from cart");
    }
    
    return res.status(200).json(new ApiResponse(200, null, "Course removed from cart successfully"));
})



export {
    addToCart,
    getCart,
    removeFromCart,
}