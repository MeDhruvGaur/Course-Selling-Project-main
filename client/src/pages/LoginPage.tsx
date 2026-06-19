import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/store";
import { loginApi } from "../services/api";

interface LoginPayload {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { setStore, isAuthenticated } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],

    mutationFn: async (payload: LoginPayload) => {
      const { data } = await loginApi(payload);
      return data.data;
    },

    onSuccess: (data: any) => {
      const { user, accessToken, refreshToken } = data;

      setStore(user, accessToken, refreshToken);

      message.success("Login successful!");

      if (user.role === "Admin" || user.role === "Instructor") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },

    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Invalid email or password",
      );
    },
  });

  const onFinish = (values: LoginPayload) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen bg-lms-blue-950 relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-lms-gold-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[140px]" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full p-6 flex items-center justify-between z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-lms-gold-500 to-yellow-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-lms-blue-950" />
          </div>

          <div>
            <span className="text-white font-bold text-lg">Learn</span>
            <span className="text-lms-gold-500 font-bold text-lg">Pro</span>
          </div>
        </Link>
      </header>

      {/* Login Card */}
      <main className="flex-1 flex justify-center items-center p-5 z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lms-gold-500/10 border border-lms-gold-500/20 text-lms-gold-400 text-xs font-semibold">
              <Sparkles size={14} />
              Welcome Back
            </div>

            <h1 className="text-3xl font-bold text-white mt-4">Login</h1>

            <p className="text-slate-400 mt-2">
              Sign in to continue to your account.
            </p>
          </div>

          <Form layout="vertical" requiredMark={false} onFinish={onFinish} className="lms-login-input">
            <Form.Item
              label={<span className="text-slate-300">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<Mail size={16} />}
                placeholder="john@example.com"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-300">Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input
                size="large"
                type={showPassword ? "text" : "password"}
                prefix={<Lock size={16} />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                placeholder="Enter password"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              loading={isPending}
              className="w-full h-12 bg-lms-gold-500 text-lms-blue-950 font-bold rounded-xl border-none"
            >
              Login
              <ArrowRight size={16} className="inline ml-2" />
            </Button>
          </Form>

          <div className="text-center mt-6 text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-lms-gold-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
