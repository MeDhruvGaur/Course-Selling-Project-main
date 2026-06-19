import React from "react";
import { registerApi } from "../../services/api";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";

const registerUser = async (payload: UserRegisterPayload) => {
  const { data } = await registerApi(payload);
  return data;
};

const StudentRegistrationNew = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      message.success(data.message);
      form.resetFields();
    },
    onError: (error: any) => {
      console.error("Error registering user:", error);
      message.error(
        error?.response?.data?.errors ||
          "Failed to register user. Please try again.",
      );
    },
  });

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    mutate(values);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="User Name" name="username">
            <Input placeholder="Enter your user name" />
          </Form.Item>
          <Form.Item label="Full Name" name="fullName">
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter your password" type="password" />
          </Form.Item>
          <Form.Item label="Mobile No." name="mobile">
            <Input placeholder="Enter your mobile number" />
          </Form.Item>
          <Form.Item label="Role" name="primaryRole">
            <Select options={userRoles} placeholder="Select user role" />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select
              options={accountStatus}
              placeholder="Select account status"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending} block>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistrationNew;

const userRoles = [
  {
    label: "Admin",
    value: 1,
  },
  {
    label: "Student",
    value: 2,
  },
  {
    label: "Teacher",
    value: 3,
  },
];

const accountStatus = [
  {
    label: "Active",
    value: 1,
  },
  {
    label: "Inactive",
    value: 2,
  },
];
