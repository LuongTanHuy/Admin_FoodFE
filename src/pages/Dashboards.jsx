import React from "react";
import { Card, Col, Row, Statistic, Table, Typography } from "antd";
import { Bar, Line } from "@ant-design/plots";
import {
  ShopOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  // Dữ liệu Summary Cards
  const statistics = [
    { title: "Tổng Cửa Hàng", value: 25, icon: <ShopOutlined />, color: "#1890ff" },
    { title: "Tổng Doanh Thu", value: "5.2 Tỷ", icon: <DollarCircleOutlined />, color: "#52c41a" },
    { title: "Tổng Đơn Hàng", value: 3500, icon: <ShoppingCartOutlined />, color: "#faad14" },
    { title: "Tổng Món Ăn", value: 120, icon: <CoffeeOutlined />, color: "#f5222d" },
  ];

  // Dữ liệu doanh thu theo tháng
  const revenueData = [
    { month: "Tháng 1", revenue: 500 },
    { month: "Tháng 2", revenue: 800 },
    { month: "Tháng 3", revenue: 1200 },
    { month: "Tháng 4", revenue: 1500 },
    { month: "Tháng 5", revenue: 1800 },
    { month: "Tháng 6", revenue: 2000 },
  ];

  // Dữ liệu số lượng đơn hàng theo thời gian
  const orderData = [
    { time: "01/03", orders: 120 },
    { time: "05/03", orders: 180 },
    { time: "10/03", orders: 250 },
    { time: "15/03", orders: 320 },
    { time: "20/03", orders: 400 },
    { time: "25/03", orders: 450 },
  ];

  // Dữ liệu cửa hàng hoạt động tốt nhất
  const topStores = [
    { key: "1", storeName: "Quán Ăn A", revenue: "1.2 Tỷ" },
    { key: "2", storeName: "Nhà Hàng B", revenue: "980 Triệu" },
    { key: "3", storeName: "Tiệm Bánh C", revenue: "870 Triệu" },
  ];

  // Dữ liệu đơn hàng gần đây
  const recentOrders = [
    { key: "1", orderID: "DH001", customer: "Nguyễn Văn A", status: "Đang giao", total: "500.000đ" },
    { key: "2", orderID: "DH002", customer: "Trần Thị B", status: "Đã giao", total: "800.000đ" },
    { key: "3", orderID: "DH003", customer: "Lê Văn C", status: "Đơn mới", total: "1.200.000đ" },
  ];

  return (
    <div style={{ padding: 20, background: "#F5F5F5", minHeight: "100vh" }}>
      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]}>
        {statistics.map((stat, index) => (
          <Col span={6} key={index}>
            <Card style={{ background: stat.color, color: "white", textAlign: "center" }}>
              <Typography.Text style={{ color: "white", fontSize: "16px" }}>
                {stat.title}
              </Typography.Text>
              <Statistic
                value={stat.value}
                valueStyle={{ color: "white", fontSize: "24px" }}
                prefix={<span style={{ fontSize: "20px" }}>{stat.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Thống Kê Doanh Thu Theo Tháng">
            <Bar
              data={revenueData}
              xField="revenue"
              yField="month"
              color={["#1890ff"]}
              height={250}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Số Lượng Đơn Hàng Theo Thời Gian">
            <Line
              data={orderData}
              xField="time"
              yField="orders"
              color={["#faad14"]}
              height={250}
            />
          </Card>
        </Col>
      </Row>

      {/* Cửa hàng hoạt động tốt nhất */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Cửa Hàng Hoạt Động Tốt Nhất">
            <Table
              columns={[
                { title: "Tên Cửa Hàng", dataIndex: "storeName", key: "storeName" },
                { title: "Doanh Thu", dataIndex: "revenue", key: "revenue" },
              ]}
              dataSource={topStores}
              pagination={false}
            />
          </Card>
        </Col>

        {/* Đơn hàng gần đây */}
        <Col span={12}>
          <Card title="Đơn Hàng Gần Đây">
            <Table
              columns={[
                { title: "Mã Đơn", dataIndex: "orderID", key: "orderID" },
                { title: "Khách Hàng", dataIndex: "customer", key: "customer" },
                { title: "Trạng Thái", dataIndex: "status", key: "status" },
                { title: "Tổng Tiền", dataIndex: "total", key: "total" },
              ]}
              dataSource={recentOrders}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
