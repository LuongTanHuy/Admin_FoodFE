import React, { useState } from "react";
import { Table, Tag, Image, Input, Space, Select } from "antd";
import "../css/Order.css";

const { Search } = Input;
const { Option } = Select;

function Orders() {
  const sampleOrders = [
    {
      id: 1,
      customer: "Lương Tấn Huy",
      address: "Hà Nội, Việt Nam",
      phone: "0123456789",
      image: "https://danangbest.com/upload_content/bun-bo-da-nang-1.webp",
      product: "Bún bò huế",
      quantity: 1,
      price: "25,000 VNĐ",
      createdAt: "2025-03-12",
      status: "Chưa Thanh Toán",
      shipper: "Nguyễn Văn A",
      shipperPhone: "0912345678",
      shipperEmail: "nguyenvana@gmail.com",
      shipperStatus: "Đã nhận đơn",
    },
    {
      id: 2,
      customer: "Nguyễn Thành Can",
      address: "TP. HCM, Việt Nam",
      phone: "0987654321",
      image: "https://photo.znews.vn/w660/Uploaded/neg_esfjeee/2019_03_15/top32quananngonodanang_1.jpg",
      product: "Bánh xèo",
      quantity: 2,
      price: "50,000 VNĐ",
      createdAt: "2025-03-10",
      status: "Đã Thanh Toán",
      shipper: "Trần Văn B",
      shipperPhone: "0987654321",
      shipperEmail: "tranvanb@gmail.com",
      shipperStatus: "Chưa nhận đơn",
    },
    {
      id: 3,
      customer: "Nguyễn Thành Nhật",
      address: "TP. HCM, Việt Nam",
      phone: "0987654321",
      image: "https://photo.znews.vn/w660/Uploaded/neg_esfjeee/2019_03_15/top32quananngonodanang_1.jpg",
      product: "Bánh xèo",
      quantity: 2,
      price: "50,000 VNĐ",
      createdAt: "2025-03-10",
      status: "Đã Thanh Toán",
      shipper: "Trần Văn B",
      shipperPhone: "0987654321",
      shipperEmail: "tranvanb@gmail.com",
      shipperStatus: "Chưa nhận đơn",
    },
    {
      id: 4,
      customer: "Phan Thị Tấn Nhật",
      address: "TP. HCM, Việt Nam",
      phone: "0987654321",
      image: "https://photo.znews.vn/w660/Uploaded/neg_esfjeee/2019_03_15/top32quananngonodanang_1.jpg",
      product: "Bánh xèo",
      quantity: 2,
      price: "50,000 VNĐ",
      createdAt: "2025-03-10",
      status: "Đã Thanh Toán",
      shipper: "Trần Văn Hưng",
      shipperPhone: "0987654321",
      shipperEmail: "tranvanb@gmail.com",
      shipperStatus: "Chưa nhận đơn",
    },
    {
      id: 5,
      customer: "Nguyễn Thành Can",
      address: "TP. HCM, Việt Nam",
      phone: "0987654321",
      image: "https://photo.znews.vn/w660/Uploaded/neg_esfjeee/2019_03_15/top32quananngonodanang_1.jpg",
      product: "Bánh xèo",
      quantity: 2,
      price: "50,000 VNĐ",
      createdAt: "2025-03-10",
      status: "Đã Thanh Toán",
      shipper: "Trần Văn B",
      shipperPhone: "0987654321",
      shipperEmail: "tranvanb@gmail.com",
      shipperStatus: "Chưa nhận đơn",
    },
    {
      id: 6,
      customer: "Nguyễn Thành Can",
      address: "TP. HCM, Việt Nam",
      phone: "0987654321",
      image: "https://photo.znews.vn/w660/Uploaded/neg_esfjeee/2019_03_15/top32quananngonodanang_1.jpg",
      product: "Bánh xèo",
      quantity: 2,
      price: "50,000 VNĐ",
      createdAt: "2025-03-10",
      status: "Đã Hủy",
      shipper: "Trần Văn B",
      shipperPhone: "0987654321",
      shipperEmail: "tranvanb@gmail.com",
      shipperStatus: "Chưa nhận đơn",
    },
  ];

  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = sampleOrders.filter((order) =>
      order.customer.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrders(filteredData);
  };

  const handleFilterChange = (value) => {
    setStatusFilter(value);
    if (value) {
      const filteredData = sampleOrders.filter((order) => order.status === value);
      setFilteredOrders(filteredData);
    } else {
      setFilteredOrders(sampleOrders);
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "Chưa Thanh Toán":
        return <Tag color="yellow">Chưa Thanh Toán</Tag>;
      case "Đã Thanh Toán":
        return <Tag color="green">Đã Thanh Toán</Tag>;
      case "Đang Giao":
        return <Tag color="blue">Đang Giao</Tag>;
      case "Đã Hủy":
        return <Tag color="red">Đã hủy</Tag>
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getShipperStatusTag = (status) => {
    switch (status) {
      case "Đã nhận đơn":
        return <Tag color="green">Đã nhận đơn</Tag>;
      case "Chưa nhận đơn":
        return <Tag color="orange">Chưa nhận đơn</Tag>;
      case "Bị hủy đơn":
        return <Tag color="red">Bị hủy đơn</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Thông Tin Người Mua",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <div>
          <strong>{record.customer}</strong>
          <br />
          {record.address}
          <br />
          📞 {record.phone}
        </div>
      ),
    },
    {
      title: "Thông Tin Sản Phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image width={50} src={record.image} />
          <div>
            <strong>{record.product}</strong>
            <br />
            Số lượng: {record.quantity}
            <br />
            Giá: {record.price}
            <br />
            Ngày tạo: {record.createdAt}
          </div>
        </div>
      ),
    },
    {
      title: "Thông Tin Shipper",
      dataIndex: "shipper",
      key: "shipper",
      render: (_, record) => (
        <div>
          <strong>{record.shipper}</strong>
          <br />
          📞 {record.shipperPhone}
          <br />
          ✉️ {record.shipperEmail}
          <br />
          {getShipperStatusTag(record.shipperStatus)}
        </div>
      ),
    },
    {
      title: "Tình Trạng",
      dataIndex: "status",
      key: "status",
      render: getStatusTag,
    },
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">QUẢN LÝ ĐƠN HÀNG</h2>

      <Space className="orders-filter">
        <Search
          placeholder="Tìm theo tên khách hàng..."
          onSearch={handleSearch}
          style={{ width: 250 }}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          placeholder="Tình Trạng"
          style={{ width: 200 }}
          onChange={handleFilterChange}
          value={statusFilter}
          allowClear
        >
          <Option value="Chưa Thanh Toán">Chưa Thanh Toán</Option>
          <Option value="Đã Thanh Toán">Đã Thanh Toán</Option>
          <Option value="Đang Giao">Đang Giao</Option>
          <Option value="Đã Hủy">Đã Hủy</Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{ pageSize: 3 }}
        bordered
      />
    </div>
  );
}

export default Orders;
