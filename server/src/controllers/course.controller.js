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

    if(!title?.trim()){
      throw new ApiErrorHandler(res, 400, "Title is required");
    }

    if(!description?.trim()){
      throw new ApiErrorHandler(res, 400, "Description is required");
    }

    if(price === undefined || price === null || price === ""){
      throw new ApiErrorHandler(res, 400, "Price is required");
    }

    if(!features?.trim()){
      throw new ApiErrorHandler(res, 400, "Features is required");
    }

    // Upload image to Cloudinary if provided; otherwise store null
    const imageFile = req.file?.path;
    let imageUrl = null;
    if (imageFile) {
      const imageResult = await uploadOnCloudinary(imageFile);
      imageUrl = imageResult ? imageResult.secure_url : null;
    }

    const course = await Course.create({
      title: title.trim(),
      description: description.trim(),
      price,
      features: features.trim(),
      instructor: req.user._id,
      image: imageUrl,   // null is fine — model no longer requires it
    });

    if(!course){
      throw new ApiErrorHandler(res, 500, "Failed to create course");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, course, "Course created successfully"));
    
})


// All courses — used on the public homepage
const getAllCourses = asyncHandler(async(req, res)=>{
   const courses = await Course.aggregate([
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


// My courses — only courses created by the logged-in instructor/admin
const getMyCourses = asyncHandler(async(req, res)=>{
   const courses = await Course.aggregate([
    {
      $match: {
        instructor: new mongoose.Types.ObjectId(req.user._id),
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
            },
          },
        ],
      },
    },
   ])

   // Return empty array instead of 404 if no courses yet
   return res.status(200).json(new ApiResponse(200, courses, "My courses fetched successfully"));
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

  // Admins can delete any course; Instructors can only delete their own
  const isAdmin = req.user.role === "Admin";
  const isOwner = existingCourse.instructor.equals(req.user._id);

  if(!isAdmin && !isOwner){
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

  // Admins can update any course; Instructors can only update their own
  const isAdmin = req.user.role === "Admin";
  const isOwner = existingCourse.instructor.equals(req.user._id);

  if(!isAdmin && !isOwner){
    throw new ApiErrorHandler(res, 403, "You are not authorized to update this course");
  }

  const course = await Course.findByIdAndUpdate(courseId, {
    ...(title && { title }),
    ...(description && { description }),
    ...(price !== undefined && { price }),
    ...(features && { features }),
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
    getMyCourses,
    getCourseDetails,
    removeCourse,
    updateCourse
}