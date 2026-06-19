import { api } from "./client.ts";

// Auth
export const loginApi = async (payload: UserLoginPayload) =>
  api.post("users/login", payload);

export const registerApi = async (payload: UserRegisterPayload) =>
  api.post("users/register", payload);

export const logoutApi = async () => api.post("users/logout");

// Courses
export const getAllCoursesApi = async () => api.get("courses/");

export const getCourseDetailsApi = async (courseId: string) =>
  api.get(`courses/${courseId}`);

export const createCourseApi = async (data: FormData) =>
  api.post("courses/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Cart
export const getCartApi = async () => api.get("cart");

export const addToCartApi = async (courseId: string) =>
  api.post("cart", { courseId });

export const removeFromCartApi = async (courseId: string) =>
  api.delete(`cart/${courseId}`);
