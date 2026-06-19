import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, getAllCourses, getMyCourses, getCourseDetails, removeCourse, updateCourse } from "../controllers/course.controller.js";

const router = Router();

// Any authenticated user — view courses
router.route("/").get(verifyJWT, getAllCourses);

// My courses — only courses created by the logged-in user (Admin/Instructor dashboard)
router.route("/my-courses").get(verifyJWT, verifyRole(["Admin", "Instructor"]), getMyCourses);

router.route("/:courseId").get(verifyJWT, getCourseDetails);

// Admin / Instructor only — course mutations
router
  .route("/create")
  .post(verifyJWT, verifyRole(["Admin", "Instructor"]), upload.single("image"), createCourse);

router
  .route("/:courseId")
  .delete(verifyJWT, verifyRole(["Admin", "Instructor"]), removeCourse)
  .put(verifyJWT, verifyRole(["Admin", "Instructor"]), upload.single("image"), updateCourse);


export default router;
