import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const DemoPage = () => {
  const [records, setRecords] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [selectedRow, setSelectedRow] = useState({
    id: "",
    name2: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
  });

  const handleSubmit = (values: any) => {
    // console.log("form ki value", values);
    //for current data (single data)

    let dataTobeInserted = {
      id: uuidv4(),
      ...values,
    };

    setCurrentData(dataTobeInserted);
    setRecords((prev) => [...prev, dataTobeInserted]);

    //clear the form after submission
    form.resetFields();
  };

  useEffect(() => {
    console.log("my data", currentData);
    console.log("data is changed");
    console.log("my records", records);
  }, [currentData]);

  const handleDelete = (rowId: string) => {
    console.log("delete button is clicked", rowId);
    console.log("my current data", records);
    const myUpdatedRecords = records.filter((item) => item.id !== rowId);
    setRecords(myUpdatedRecords);
    message.success("Data deleted!");
  };

  const handleUpdate = (rowId: string) => {
    setIsModalOpen(true);

    // array.map -> map or to get the whole array rendered
    // array.filter -> returns an array with the filtered items
    // array.find -> returns the first item that matches the condition
    // syntax (value) =>{ return use that value}

    let myArray = [1, 2, 3, 4, 5];

    // myArray.map((item) => {
    //   console.log(item);
    // });

    // myArray.filter(() => {});
    // myArray.find(() => {});

    const foundRecord = records.find((row) => {
      return row.id === rowId;
    });

    console.log("found record", foundRecord);

    setSelectedRow(foundRecord);
  };

  const handleUpdateSubmit = (id: string) => {
    let updatedData = records.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name2: selectedRow?.name2,
          age: selectedRow?.age,
          gender: selectedRow?.gender,
          mobile: selectedRow?.mobile,
          email: selectedRow?.email,
        };
      }
      return item;
    });

    console.log("selected row", selectedRow);

    console.log("updated data", updatedData);
    setRecords(updatedData);
    setIsModalOpen(false);
    message.success("Data updated!");
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name2",
      key: "name2",
      width: 200,
      render: (text: string) => (
        <p className="text-red-500 font-semibold">{text}</p>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Update",
      dataIndex: "id",
      key: "id",
      render: (a: any, b: any, c: any) => {
        return (
          <Button variant="solid" color="blue" onClick={() => handleUpdate(a)}>
            Update
          </Button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",
      render: (a: any, b: any, c: any) => {
        return (
          <Button variant="solid" color="red" onClick={() => handleDelete(a)}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div className="w-full  bg-blue-300 flex  gap-4 p-4">
      <Link
        to="/registration"
        className="absolute top-4 left-4 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-xs border border-indigo-100"
      >
        <FaUserPlus size={12} /> Go to Registration
      </Link>

      {/* 
Grid
Screen -> 24 parts
half screen -> 12 parts
1/4 => 6 parts

*/}

      <Row className="w-full" gutter={[16, 16]}>
        <Col span={24} md={12}>
          <div className="p-6 bg-white rounded-lg shadow-lg md:bg-orange-500 lg:bg-red-500">
            <Form
              initialValues={{
                name2: "Naman",
                age: 18,
                email: "test@gmail.com",
                mobile: 9878745405,
                gender: "female",
              }}
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="name2"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter Full name" prefix={<FaUserPlus />} />
              </Form.Item>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  { required: true, message: "Please enter your age" },
                  {
                    pattern: /^[0-9]{2}$/,
                    message: "Please enter a valid age between 10 and 100",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={10}
                  max={99}
                  placeholder="Enter your age"
                  suffix={<FiCalendar />}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  { required: true, message: "Please enter your gender" },
                ]}
              >
                <Select placeholder="Select gender" options={genderData} />
              </Form.Item>

              <Form.Item
                name="mobile"
                label="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please Enter your mobile number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                ]}
              >
                <Input placeholder="Enter your mobile number" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>
              <Form.Item
                name="dob"
                label="DOB"
                rules={[
                  {
                    required: true,
                    message: "Please enter your date of birth",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Enter your date of birth"
                  className="w-full"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div className="text-2xl text-red-500">
            {"Counter : " + records?.length}
          </div>
          <Table
            columns={columns}
            scroll={{ y: 400 }}
            dataSource={records}
            rowKey={(myRow: any) => myRow?.id}
          />
        </Col>
      </Row>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        cancelButtonProps={{
          style: {
            background: "red",
            display: "none",
          },
        }}
        okButtonProps={{
          type: "primary",
        }}
        onCancel={null}
      >
        <Input
          placeholder="Enter your name"
          value={selectedRow?.name2}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, name2: e.target.value })
          }
        />
        <Button
          block
          type="primary"
          className="mt-4"
          onClick={() => handleUpdateSubmit(selectedRow?.id)}
        >
          Update
        </Button>
      </Modal>
    </div>
  );
};

export default DemoPage;
