type UserLoginPayload = {
  email: string;
  password: string;
};

type UserRegisterPayload = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: "Admin" | "Instructor" | "Student";
};

type Instructor = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  features: string;
  instructor: Instructor[] | Instructor;
  createdAt: string;
  updatedAt: string;
};

type CartCourseItem = {
  course: Course;
  _id: string;
};

type Cart = {
  _id: string;
  courses: CartCourseItem[];
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};