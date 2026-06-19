import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createCourse, getAllCourses, getCourseDetails, removeCourse, updateCourse } from "../controllers/course.controller.js";

const router = Router();

router
  .route("/create")
  .post(verifyJWT, upload.single("image"), createCourse);

  router.route("/:courseId").get(verifyJWT, getCourseDetails);
  router.route("/:courseId").delete(verifyJWT, removeCourse);
  router.route("/:courseId").put(verifyJWT, upload.single("image"), updateCourse);
  router.route("/").get(verifyJWT, getAllCourses);


export default router;
