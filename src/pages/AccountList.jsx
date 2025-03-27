import React, { useState } from "react";
import { Table, Input, Tag, Button, Image, message } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Search } = Input;

const AccountList = () => {
  const [searchText, setSearchText] = useState("");

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      image: "https://yt3.googleusercontent.com/Whzpflv2Sw5qMkttNMvWlsgE9x5_-Aj2wzTfSC4e-Wp-XqsWXGADov-5Qd2xpg7-FG880ZuVNw=s900-c-k-c0x00ffffff-no-rj",
      name: "Người Mua Hàng",
      email: "muahang@gmail.com",
      phone: "09035543678",
      joinDate: "2024-04-15",
      address: "272A Ngũ Hành Sơn, Đà Nẵng",
      role: "Người Dùng",
      totalOrders: 9,
      deliveredOrders: 5,
      status: "active",
    },
    {
      id: 2,
      image: "https://i1.sndcdn.com/artworks-Wk2DhnQk2kdW6b51-lzVqhw-t500x500.jpg",
      name: "Admin",
      email: "admin@gmail.com",
      phone: "0822034255",
      joinDate: "2024-04-16",
      address: "272B Ngũ Hành Sơn, Đà Nẵng",
      role: "Quản Trị Viên",
      totalOrders: 0,
      deliveredOrders: 4,
      status: "active",
    },
  ]);

  const validateSearch = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      message.error("Từ khóa tìm kiếm không hợp lệ!");
      return false;
    }
    return true;
  };

  const toggleStatus = (id) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, status: acc.status === "active" ? "inactive" : "active" } : acc
      )
    );
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (src) => <Image width={50} src={src} />,
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
      render: (_, record) => (
        <div>
          <strong>Tài Khoản: {record.name}</strong>
          <br /> Email: {record.email}
          <br /> Điện Thoại: {record.phone}
          <br /> Ngày Tham Gia: {record.joinDate}
          <br /> Địa Chỉ: {record.address}
        </div>
      ),
    },
    {
      title: "Đối tượng",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => <Tag color={role === "Người Dùng" ? "blue" : "red"}>{role}</Tag>,
    },
    {
      title: "Tổng đơn hàng đã mua",
      dataIndex: "totalOrders",
      key: "totalOrders",
      align: "center",
    },
    {
      title: "Tổng đơn hàng đã giao",
      dataIndex: "deliveredOrders",
      key: "deliveredOrders",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          icon={record.status === "active" ? <UnlockOutlined /> : <LockOutlined />}
          onClick={() => toggleStatus(record.id)}
          style={{
            fontSize: "18px",
            width: "80px",
            height: "35px",
            backgroundColor: "white",
            borderColor: record.status === "active" ? "green" : "red",
            color: record.status === "active" ? "green" : "red",
            display: "flex",
            marginLeft: "35px",
            borderRadius: "5px",
          }}
        ></Button>
      ),
    },
  ];

  const filteredAccounts = accounts.filter(
    (account) => validateSearch(searchText) && account.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 20, backgroundColor: "#1e1e2e", color: "white", borderRadius: 10 }}>
      <h2 style={{ color: "white", fontWeight: "bold" }}>DANH SÁCH TÀI KHOẢN</h2>
      <Search
        placeholder="Tìm kiếm..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />

      {filteredAccounts.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>Không có tài khoản nào phù hợp.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredAccounts}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          bordered
        />
      )}
    </div>
  );
};

export default AccountList;
