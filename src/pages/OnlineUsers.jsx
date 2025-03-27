import React, { useState, useEffect } from "react";
import { Table, Button, message, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const OnlineUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const mockUsers = [
    { id: 1, username: "Nguyễn Đăng Hưng" },
    { id: 2, username: "Phan Tấn Nhật" },
    { id: 3, username: "Nguyễn Thành Can" },
    { id: 4, username: "Đồng Quốc Công" },
    { id: 5, username: "Lê Văn Tỉnh" },
  ];

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      setTimeout(() => {
        setUsers(mockUsers);
      }, 500);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user online:", error);
    }
  };

  const handleKickUser = (userId) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success("Đã kick user thành công");
    } catch (error) {
      message.error("Lỗi khi kick user");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleKickUser(record.id)}>
          Kick
        </Button>
      ),
    },
  ];


  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#1e1e2e",
        color: "white",
        borderRadius: 10,
      }}
    >
      <h2>Quản lý User Online</h2>

      {/* Tìm kiêm*/}
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
        <Input
          placeholder="Tìm theo tên khách hàng..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "250px", 
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "white",
            paddingRight: "10px", 
          }}
          suffix={<SearchOutlined style={{ color: "#000", fontSize: "16px" }} />}
        />
      </div>

      {/* Bảng danh sách user */}
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default OnlineUsers;
