import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import React from "react";
// import { registerApi } from "../../services/api";

const registerUser = async (payload: UserLoginPayload) => {
  const { data } = await registerApi(payload);
  console.log("data:", data);
  return data;
};

const StudentRegistration = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      message.success(data.message);
      console.log("api response:", data);
    },
    onError: (error: any) => {
        console.log("error:", error.response);
      message.error(error?.response?.data?.errors);
    },
  });
 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-6">
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
      
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">
        <h1 className="text-5xl font-bold mb-4">
          Student Portal
        </h1>

        <p className="text-lg text-blue-100 mb-8">
          Register yourself and start your learning journey with
          interactive classes, projects, and mentorship.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>Live Interactive Classes</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>Project Based Learning</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>Recorded Sessions</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>Doubt Support & Mentorship</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Fill in your details to register.
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={(values) => mutate(values)}
          className="space-y-2"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter username",
                },
              ]}
            >
              <Input size="large" placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter full name",
                },
              ]}
            >
              <Input size="large" placeholder="Full Name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              { type: "email" },
            ]}
          >
            <Input
              size="large"
              placeholder="example@gmail.com"
            />
          </Form.Item>

          <div className="grid md:grid-cols-2 gap-4">
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
              />
            </Form.Item>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Form.Item
              label="Primary Role"
              name="primaryRole"
              initialValue={2}
            >
              <Select
                size="large"
                options={[
                  {
                    label: "Student",
                    value: 2,
                  },
                  {
                    label: "Teacher",
                    value: 1,
                  },
                  {
                    label: "Admin",
                    value: 3,
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              initialValue="ACTIVE"
            >
              <Select
                size="large"
                options={[
                  {
                    label: "Active",
                    value: "ACTIVE",
                  },
                  {
                    label: "Inactive",
                    value: "INACTIVE",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isPending}
              block
              className="h-12 font-semibold"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
);
};

export default StudentRegistration;
