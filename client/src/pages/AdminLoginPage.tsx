import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button, Input, Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/store";
import { loginApi } from "../services/api";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setStore, isAuthenticated } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Login Mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload) => {
      const { data } = await loginApi(payload);
      return data.data;
    },

    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;

      message.success("Login successful!");

      setStore(user, accessToken, refreshToken);

      navigate("/admin/dashboard");
    },

    onError: (error) => {
      message.error(
        error?.response?.data?.message ||
        "Invalid email or password. Please try again.",
      );
    },
  });

  // Submit Handler
  const handleLogin = (values) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute top-[-25%] left-[-10%] w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full p-6 flex items-center justify-between z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Login Card */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <motion.div
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-blue-500" />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">Welcome Back</h2>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Form */}
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleLogin}
            className="space-y-4 lms-login-input"
          >
            {/* Email */}
            <Form.Item
              name="email"
              className="mb-0"
              label={
                <span className="text-slate-300 uppercase text-xs font-semibold tracking-wider">
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                size="large"
                autoComplete="email"
                placeholder="Enter your email"
                prefix={<Mail className="w-4 h-4 text-slate-500 mr-2" />}
                className="h-12 rounded-xl"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              className="mb-0"
              label={
                <span className="text-slate-300 uppercase text-xs font-semibold tracking-wider">
                  Password
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input
                size="large"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                prefix={<Lock className="w-4 h-4 text-slate-500 mr-2" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                className="h-12 rounded-xl"
              />
            </Form.Item>

            {/* Submit */}
            <Button
              htmlType="submit"
              loading={isPending}
              className="w-full h-12 mt-6 rounded-xl font-semibold text-white border-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Form>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
