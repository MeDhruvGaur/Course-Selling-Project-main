import { ApiErrorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  removeImageFromCloudinary,
} from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";


const createCourse = asyncHandler(async(req, res)=>{
    const {title, description, price, features} = req.body;

    if(title?.trim() === ""){
      throw new ApiErrorHandler(res, 400, "Title is required");
    }

    if(description?.trim() === ""){
      throw new ApiErrorHandler(res, 400, "Description is required");
    }

    if(price?.trim() === ""){
      throw new ApiErrorHandler(res, 400, "Price is required");
    }

    if(features?.trim() === ""){
      throw new ApiErrorHandler(res, 400, "Features is required");
    }

    const image = req.file?.path;
  // if image is available, upload it to cloudinary else set it to null
  const imageResult = image ? await uploadOnCloudinary(image) : null;


    const course = await Course.create({
      title,
      description,
      price,
      features: features,
      instructor: req.user._id,
    image: imageResult ? imageResult.secure_url : null,
    });

    if(!course){
      throw new ApiErrorHandler(res, 500, "Failed to create course");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, course, "Course created successfully"));
    
})


const getAllCourses = asyncHandler(async(req, res)=>{
   const courses = await Course.aggregate([
    // {
    //     $match: {
    //         instructor: new mongoose.Types.ObjectId(req.user._id),
    //     },
    // },
    {
      $lookup: {
        from: "users",
        localField: "instructor",
        foreignField: "_id",
        as: "instructor",
        pipeline: [
          {
            $project: {
              fullName: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
   ])

   if(!courses || courses?.length === 0){
    throw new ApiErrorHandler(res, 404, "Courses not found");
   }

   return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
})

const getCourseDetails = asyncHandler(async(req, res)=>{
  const {courseId} = req.params;
  if(!courseId?.trim()){
    throw new ApiErrorHandler(res, 400, "Course ID is required");
  }

  const course = await Course.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(courseId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "instructor",
        foreignField: "_id",
        as: "instructor",
        pipeline: [
          {
            $project: {
              fullName: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);
  if(!course || course?.length === 0){
    throw new ApiErrorHandler(res, 404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, course, "Course fetched successfully"));
})


const removeCourse = asyncHandler(async(req, res)=>{
  const {courseId} = req.params;
  if(!courseId?.trim()){
    throw new ApiErrorHandler(res, 400, "Course ID is required");
  }

const existingCourse = await Course.findById(courseId);
  if(!existingCourse) 
    throw new ApiErrorHandler(res, 404, "Course not found");
  
  if(!existingCourse.instructor.equals(req.user._id)){
    throw new ApiErrorHandler(res, 403, "You are not authorized to delete this course");
  }

  const course = await Course.findByIdAndDelete(courseId);

  if(!course){
    throw new ApiErrorHandler(res, 404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
})


const updateCourse = asyncHandler(async(req, res)=>{
  const {courseId} = req.params;
  const {title, description, price, features} = req.body;

  if(!courseId?.trim()){
    throw new ApiErrorHandler(res, 400, "Course ID is required");
  }

  const existingCourse = await Course.findById(courseId);
  if(!existingCourse) 
    throw new ApiErrorHandler(res, 404, "Course not found");
  
  if(!existingCourse.instructor.equals(req.user._id)){
    throw new ApiErrorHandler(res, 403, "You are not authorized to update this course");
  }

  const course = await Course.findByIdAndUpdate(courseId, {
    title,
    description,
    price,
    features: features,
  }, 
  {
    new: true,
  }
);

  if(!course){
    throw new ApiErrorHandler(res, 404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"));
})

export {
    createCourse,
    getAllCourses,
    getCourseDetails,
    removeCourse,
    updateCourse
}