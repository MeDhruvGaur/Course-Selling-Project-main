import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus, Image as ImageIcon, LayoutDashboard, Settings, Users, BookOpen } from "lucide-react";
import { Button, Input, Form, message, InputNumber, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseApi } from "../services/api";
import useAuthStore from "../store/store";

const { TextArea } = Input;

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearStore, user } = useAuthStore();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleLogout = () => {
    clearStore();
    navigate("/admin/login");
  };

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
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to create course. Please try again."
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
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 shrink-0">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Admin<span className="text-red-500">Panel</span></span>
          </Link>
        </div>

        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold uppercase overflow-hidden">
            {user?.avatar ? <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" /> : user?.fullName?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Management
          </div>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-500/10 text-red-400 font-medium transition-colors">
            <BookOpen className="w-5 h-5" /> Courses
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Students
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Analytics
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50/50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 md:px-10 sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">Add New Course</h1>
        </header>

        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8 pb-6 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Plus className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Course Details</h2>
                <p className="text-sm text-slate-500">Provide the necessary information to publish a new course to the catalog.</p>
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
                  <Input size="large" placeholder="e.g. 20 Hours of Video, 5 Projects, Certificate of Completion" className="rounded-xl!" />
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
                  onClick={() => {
                    form.resetFields();
                    setFileList([]);
                  }}
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
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
