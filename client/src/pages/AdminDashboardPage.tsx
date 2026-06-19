import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Image as ImageIcon,
  LayoutDashboard,
  BookOpen,
  Trash2,
  Eye,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import {
  Button,
  Input,
  Form,
  message,
  InputNumber,
  Upload,
  Spin,
  Empty,
  Popconfirm,
  Badge,
  Tag,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourseApi, getMyCoursesApi, deleteCourseApi } from "../services/api";
import useAuthStore from "../store/store";

const { TextArea } = Input;

type ActiveTab = "create" | "courses";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearStore, user } = useAuthStore();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("create");

  const handleLogout = () => {
    clearStore();
    navigate("/admin/login");
  };

  // ─── Fetch All Courses ─────────────────────────────────────────────────────
  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const { data } = await getMyCoursesApi();
      return data.data as Course[];
    },
    enabled: activeTab === "courses",
  });

  // ─── Create Course ─────────────────────────────────────────────────────────
  const { mutate: createCourse, isPending } = useMutation({
    mutationKey: ["createCourse"],
    mutationFn: async (formData: FormData) => {
      const { data } = await createCourseApi(formData);
      return data;
    },
    onSuccess: () => {
      message.success("Course created successfully!");
      form.resetFields();
      setFileList([]);
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to create course. Please try again."
      );
    },
  });

  // ─── Delete Course ─────────────────────────────────────────────────────────
  const { mutate: deleteCourse, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: async (courseId: string) => {
      const { data } = await deleteCourseApi(courseId);
      return data;
    },
    onSuccess: () => {
      message.success("Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to delete course."
      );
    },
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("features", values.features);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    createCourse(formData);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  // ─── Sidebar nav items ─────────────────────────────────────────────────────
  const navItems: { key: ActiveTab; icon: React.ReactNode; label: string }[] = [
    { key: "create", icon: <Plus className="w-5 h-5" />, label: "Create Course" },
    { key: "courses", icon: <BookOpen className="w-5 h-5" />, label: "All Courses" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Admin<span className="text-red-400">Panel</span>
            </span>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white font-bold uppercase shrink-0">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Management
          </div>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-left cursor-pointer ${
                activeTab === item.key
                  ? "bg-red-500/15 text-red-400 border border-red-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
              }`}
            >
              {item.icon}
              {item.label}
              {item.key === "courses" && courses && courses.length > 0 && (
                <Badge
                  count={courses.length}
                  size="small"
                  color="#ef4444"
                  className="ml-auto"
                />
              )}
            </button>
          ))}

          <div className="px-3 pt-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Quick Links
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all border border-transparent"
          >
            <LayoutDashboard className="w-5 h-5" /> View Store
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-slate-50/50">
        <AnimatePresence mode="wait">
          {/* ─── CREATE COURSE TAB ─────────────────────────────────────────── */}
          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 md:px-10 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-red-600" />
                  </div>
                  <h1 className="text-xl font-bold text-slate-800">Create New Course</h1>
                </div>
              </header>

              <div className="p-6 md:p-10 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <div className="mb-8 pb-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Course Details</h2>
                      <p className="text-sm text-slate-500">
                        Provide the necessary information to publish a new course.
                      </p>
                    </div>
                  </div>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Form.Item
                        name="title"
                        label={<span className="font-semibold text-slate-700">Course Title</span>}
                        rules={[{ required: true, message: "Please enter the course title" }]}
                        className="mb-0 md:col-span-2"
                      >
                        <Input size="large" placeholder="e.g. Advanced React Development" className="rounded-xl!" />
                      </Form.Item>

                      <Form.Item
                        name="price"
                        label={<span className="font-semibold text-slate-700">Price (₹)</span>}
                        rules={[{ required: true, message: "Please enter the price" }]}
                        className="mb-0"
                      >
                        <InputNumber
                          size="large"
                          min={0}
                          className="w-full! rounded-xl!"
                          placeholder="e.g. 4999"
                        />
                      </Form.Item>

                      <Form.Item
                        name="image"
                        label={<span className="font-semibold text-slate-700">Course Thumbnail</span>}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className="mb-0"
                      >
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          listType="picture"
                          fileList={fileList}
                          onChange={({ fileList }) => setFileList(fileList)}
                          className="w-full"
                        >
                          <Button icon={<ImageIcon className="w-4 h-4" />} className="rounded-lg!">
                            Select Image
                          </Button>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        name="features"
                        label={<span className="font-semibold text-slate-700">Key Features (comma separated)</span>}
                        rules={[{ required: true, message: "Please list some features" }]}
                        className="mb-0 md:col-span-2"
                      >
                        <Input
                          size="large"
                          placeholder="e.g. 20 Hours of Video, 5 Projects, Certificate of Completion"
                          className="rounded-xl!"
                        />
                      </Form.Item>

                      <Form.Item
                        name="description"
                        label={<span className="font-semibold text-slate-700">Detailed Description</span>}
                        rules={[{ required: true, message: "Please provide a description" }]}
                        className="mb-0 md:col-span-2"
                      >
                        <TextArea
                          rows={5}
                          placeholder="Write a comprehensive description of what students will learn..."
                          className="rounded-xl!"
                        />
                      </Form.Item>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                      <Button
                        type="default"
                        size="large"
                        onClick={() => { form.resetFields(); setFileList([]); }}
                        className="rounded-xl! font-semibold!"
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isPending}
                        className="rounded-xl! font-bold! bg-red-600! hover:bg-red-500! border-none! shadow-md!"
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Publish Course
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── ALL COURSES TAB ───────────────────────────────────────────── */}
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-red-600" />
                  </div>
                  <h1 className="text-xl font-bold text-slate-800">All Courses</h1>
                  {courses && (
                    <span className="text-sm text-slate-500 font-medium">
                      ({courses.length} published)
                    </span>
                  )}
                </div>
                <Button
                  type="primary"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setActiveTab("create")}
                  className="rounded-lg! bg-red-600! hover:bg-red-500! border-none! font-semibold!"
                >
                  New Course
                </Button>
              </header>

              <div className="p-6 md:p-10">
                {/* Loading */}
                {isLoadingCourses && (
                  <div className="flex justify-center items-center py-24">
                    <Spin size="large" />
                  </div>
                )}

                {/* Empty */}
                {!isLoadingCourses && (!courses || courses.length === 0) && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center py-20">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <div className="text-center">
                          <p className="text-slate-600 font-semibold text-lg">No courses yet</p>
                          <p className="text-slate-400 text-sm mt-1">
                            Create your first course to get started.
                          </p>
                        </div>
                      }
                    />
                    <Button
                      type="primary"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={() => setActiveTab("create")}
                      className="mt-6 rounded-xl! bg-red-600! hover:bg-red-500! border-none! font-bold!"
                    >
                      Create First Course
                    </Button>
                  </div>
                )}

                {/* Course Grid */}
                {!isLoadingCourses && courses && courses.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course, idx) => {
                      const instructor = Array.isArray(course.instructor)
                        ? course.instructor[0]
                        : course.instructor;
                      const features = course.features
                        ? course.features.split(",").slice(0, 3)
                        : [];

                      return (
                        <motion.div
                          key={course._id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-video bg-slate-100 overflow-hidden">
                            {course.image ? (
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                <span className="text-white/20 text-5xl font-black">
                                  {course.title?.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <Tag color="green" className="font-semibold! text-xs!">Published</Tag>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-slate-900 text-base line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-xs text-slate-400 mb-3">
                              by {instructor?.fullName ?? "Unknown"}
                            </p>

                            <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                              {course.description}
                            </p>

                            {/* Features */}
                            {features.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {features.map((f: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-[11px] bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full"
                                  >
                                    {f.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Price + Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <div>
                                <span className="text-xl font-extrabold text-slate-900">
                                  ₹{course.price?.toLocaleString()}
                                </span>
                                <span className="text-xs text-slate-400 line-through ml-2">
                                  ₹{(course.price * 2.5).toLocaleString()}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="small"
                                  icon={<Eye className="w-3.5 h-3.5" />}
                                  onClick={() => navigate(`/course/${course._id}`)}
                                  className="rounded-lg! text-xs!"
                                >
                                  View
                                </Button>
                                <Popconfirm
                                  title="Delete Course"
                                  description={
                                    <div className="flex items-start gap-2 max-w-[220px]">
                                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                      <span>Are you sure? This action cannot be undone.</span>
                                    </div>
                                  }
                                  onConfirm={() => deleteCourse(course._id)}
                                  okText="Delete"
                                  cancelText="Cancel"
                                  okButtonProps={{ danger: true }}
                                >
                                  <Button
                                    size="small"
                                    danger
                                    icon={<Trash2 className="w-3.5 h-3.5" />}
                                    loading={isDeleting}
                                    className="rounded-lg! text-xs!"
                                  >
                                    Delete
                                  </Button>
                                </Popconfirm>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
