import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";
import { Form, Input, Button, Select, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../services/api";
import useAuthStore from "../store/store.ts";

const { Option } = Select;

interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Instructor" | "Student";
  description?: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setStore } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await registerApi(payload);
      return data;
    },
    onSuccess: (data) => {
      setStore(data.data.user, data.data.accessToken, data.data.refreshToken);
      message.success("Registration successful!");
      navigate("/");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });

  const onFinish = (values: RegisterPayload) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen bg-lms-blue-950 flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-25%] left-[-10%] w-[500px] h-[500px] rounded-full bg-lms-gold-500/10 blur-[120px]" />
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

      {/* Form */}
      <main className="flex-1 flex items-center justify-center p-5 z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lms-gold-500/10 border border-lms-gold-500/20 text-lms-gold-400 text-xs font-semibold">
              <Sparkles size={14} />
              Create Account
            </div>
            <h1 className="text-3xl font-bold text-white mt-4">Register</h1>
            <p className="text-slate-400 mt-2">Create your LearnPro account.</p>
          </div>

          <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
            <Form.Item
              label={<span className="text-slate-300">Full Name</span>}
              name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input
                size="large"
                prefix={<User size={16} className="text-slate-400" />}
                placeholder="John Doe"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-300">Username</span>}
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input
                size="large"
                prefix={<User size={16} className="text-slate-400" />}
                placeholder="john123"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-300">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="large"
                prefix={<Mail size={16} className="text-slate-400" />}
                placeholder="john@example.com"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-300">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please enter password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input
                size="large"
                type={showPassword ? "text" : "password"}
                prefix={<Lock size={16} className="text-slate-400" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-300">Role</span>}
              name="role"
              initialValue="Student"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select size="large">
                <Option value="Student">Student</Option>
                <Option value="Instructor">Instructor</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

            <Button
              htmlType="submit"
              loading={isPending}
              className="w-full h-12 bg-lms-gold-500 text-lms-blue-950 font-bold rounded-xl border-none"
            >
              {!isPending && (
                <>
                  Create Account
                  <ArrowRight size={16} className="inline ml-2" />
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-6 text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lms-gold-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegistrationPage;
