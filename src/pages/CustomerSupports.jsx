import React, { useState, useEffect } from "react";
import { Input, Button, Table, message, Form, Card, Typography } from "antd";

const { Title } = Typography;

const CustomerSupports = () => {
  const [form] = Form.useForm();
  const [feedbacks, setFeedbacks] = useState([]);

  // Dữ liệu phản hồi giả lập
  const mockFeedbacks = [
    { id: 1, email: "alice@example.com", message: "Dịch vụ rất tốt!" },
    { id: 2, email: "bob@example.com", message: "Giao hàng hơi chậm." },
    { id: 3, email: "charlie@example.com", message: "Sản phẩm rất chất lượng!" },
  ];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setTimeout(() => {
        setFeedbacks(mockFeedbacks);
      }, 500);
    } catch (error) {
      console.error("Lỗi khi lấy phản hồi:", error);
    }
  };

  const sendEmail = async (values) => {
    try {
      console.log("Gửi email:", values);
      message.success("Email đã được gửi!");
      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi gửi email!");
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-white">{text}</span>,
    },
    {
      title: "Nội dung phản hồi",
      dataIndex: "message",
      key: "message",
      render: (text) => <span className="text-white">{text}</span>,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <Card className="w-full max-w-4xl bg-gray-800 text-white shadow-lg">
        <Title level={3} className="text-center text-white">📧 Gửi Email & Quản lý Phản hồi</Title>

        {/* Form gửi email */}
        <Form form={form} layout="vertical" onFinish={sendEmail} className="mt-4">
          <Form.Item
            name="to"
            label={<span className="text-white">📩 Email người nhận</span>}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Nhập email" className="bg-gray-700 text-white" />
          </Form.Item>

          <Form.Item
            name="subject"
            label={<span className="text-white">✉️ Tiêu đề</span>}
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề" className="bg-gray-700 text-white" />
          </Form.Item>

          <Form.Item
            name="content"
            label={<span className="text-white">📝 Nội dung</span>}
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập nội dung email" className="bg-gray-700 text-white" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            🚀 Gửi Email
          </Button>
        </Form>

        {/* Danh sách phản hồi */}
        <Title level={4} className="mt-6 text-white">💬 Phản hồi từ khách hàng</Title>
        <Table
          dataSource={feedbacks}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="mt-4 bg-gray-700 text-white"
        />
      </Card>
    </div>
  );
};

export default CustomerSupports;
