import React, { useState } from "react";
import { Table, Input, Image, Typography } from "antd";

const { Search } = Input;
const { Text } = Typography;

const storeData = [
  {
    id: 1,
    name: "Karaoke",
    address: "Đ.29 Tháng 3/170 P.Hòa Xuân, Cẩm Lệ, Đà Nẵng",
    email: "hungdangnguyen001@gmail.com",
    phone: "0905123456",
    createdAt: "2024-06-10 01:23:32",
    image: "https://dulichtoday.vn/wp-content/uploads/2023/07/karaoke-da-nang-6.jpg", 
    categories: ["Ăn Vặt", "Cơm", "Nước", "Bún"],
    totalSold: 1,
    revenue: "14.0 VNĐ",
  },
  {
    id: 2,
    name: "New Phương Đông Club",
    address: "01 An Thượng 18, P. Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng",
    email: "huydeen002@gmail.com",
    phone: "0815880596",
    createdAt: "2024-06-09 01:23:32",
    image: "https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2023/3/9/new-phuong-dong-1-1678350342793669823826-0-50-381-660-crop-1678350737195403385062.jpg",
    categories: ["Kẹo", "Nước khoái", "Bột", "Bóng cười"],
    totalSold: 100,
    revenue: "100.000.000.000 VNĐ",
  },
  {
    id: 3,
    name: "New MDM Club",
    address: "01 Lê Hồng Phong - TP Hải Phòng",
    email: "huydeen002@gmail.com",
    phone: "0815880596",
    createdAt: "2024-06-09 01:23:32",
    image: "https://chillvietnam.com/wp-content/uploads/2022/12/new-mdm-club-thien-duong-an-choi-so-1-dat-cang-hai-phong-1671619642.jpeg",
    categories: ["Trà Sữa", "Nước Ngọt"],
    totalSold: 0,
    revenue: "0.0 VNĐ",
  },
  {
    id: 4,
    name: "Tiger Sugar",
    address: "01 An Thượng 18, P. Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng",
    email: "huydeen002@gmail.com",
    phone: "0815880596",
    createdAt: "2024-06-09 01:23:32",
    image: "https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2023/3/9/new-phuong-dong-1-1678350342793669823826-0-50-381-660-crop-1678350737195403385062.jpg",
    categories: ["Trà Sữa", "Nước Ngọt"],
    totalSold: 0,
    revenue: "0.0 VNĐ",
  },
];

const StoreList = () => {
  const [filteredStores, setFilteredStores] = useState(storeData);

  const handleSearch = (value) => {
    const filtered = storeData.filter((store) =>
      store.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (src) => <Image width={150} src={src} />,
    },
    {
        title: "Thông tin",
        key: "info",
        render: (_, record) => (
          <div style={{ color: "#fff" }}> 
            <Text strong style={{ color: "#fff" }}>Tên cửa hàng: {record.name}</Text> <br />
            <Text style={{ color: "#fff" }}>Địa chỉ: {record.address}</Text> <br />
            <Text style={{ color: "#fff" }}>Email: {record.email}</Text> <br />
            <Text style={{ color: "#fff" }}>Số điện thoại: {record.phone}</Text> <br />
            <Text style={{ color: "#fff" }}>Ngày tạo: {record.createdAt}</Text>
          </div>
        ),
    },
    {
      title: "Danh mục kinh doanh",
      dataIndex: "categories",
      key: "categories",
      align: "center",
      render: (categories) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {categories.map((cat) => (
            <div key={cat}>{cat}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng sản phẩm đã bán",
      dataIndex: "totalSold",
      key: "totalSold",
      align: "center",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      align: "center",
    },
  ];

  return (
    <div style={{ padding: 20, backgroundColor: "#1a1a2e", color: "#fff", borderRadius: 10 }}>
      <h2 style={{ color: "#fff" }}>DANH SÁCH CỬA HÀNG</h2>
      <Search
        placeholder="Tìm kiếm cửa hàng..."
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={filteredStores}
        rowKey="id"
        pagination={{ pageSize: 3 }}
        bordered
        style={{ color: "#fff" }} 
      />
    </div>
  );
};

export default StoreList;
