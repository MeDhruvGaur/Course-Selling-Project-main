import { createBrowserRouter } from "react-router-dom";
import { 
  HomePage, 
  LoginPage, 
  CourseDetailsPage, 
  CartPage,
  Registration,
  AdminLoginPage,
  AdminDashboardPage
} from "../pages";
import LmsLayout from "../layout/LmsLayout";
import ProtectedRoute from "./ProtectedRoute";

export function MyRouter() {
  const routes = [
    // Standalone Auth Routes
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    
    // Admin Routes
    {
      path: "/admin/login",
      element: <AdminLoginPage />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      ),
    },
    
    // LMS Application Routes (wrapped in Navbar + Footer)
    {
      path: "/",
      element: <LmsLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "course/:courseId",
          element: <CourseDetailsPage />,
        },
        // Protected Routes inside the LMS Layout
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ];

  return createBrowserRouter(routes);
}
