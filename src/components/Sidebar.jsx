import React from "react";
import { Layout, Typography, Button, Menu, Image } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  BarChartOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserAddOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
  NotificationOutlined
} from "@ant-design/icons";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate(); 

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: "#0D1B2A",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 20,
      }}
    >
      {/* Nút Toggle Sidebar */}
      <Button
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          color: "white",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
      />

      {/* Thông tin tài khoản */}
      <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Image
          width={collapsed ? 40 : 64}
          src="https://i1.sndcdn.com/artworks-Wk2DhnQk2kdW6b51-lzVqhw-t500x500.jpg"
          preview={{ mask: "Preview" }} 
          style={{ borderRadius: "50%" }} 
        />

        {!collapsed && (
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <Text style={{ color: "white", fontSize: 16 }}>Cơm Thái Hoàng</Text>
          </div>
        )}

        {!collapsed && (
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            size="small"
            style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            Đăng xuất
          </Button>
        )}
      </div>

      {/* Menu sidebar */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["orders"]}
        onClick={({ key }) => navigate(`/${key}`)}
        style={{ background: "#0D1B2A" }}
      >
        <Menu.Item key="dashboards" icon={<HomeOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="statistics" icon={<BarChartOutlined />}>
          Thống Kê
        </Menu.Item>
        <Menu.Item key="foods" icon={<ProductOutlined />}>
          Món Ăn
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          Đơn Hàng
        </Menu.Item>
        <Menu.Item key="storelist" icon={<ShopOutlined />}>
          Danh sách cửa hàng
        </Menu.Item>
        <Menu.Item key="accounts" icon={<UserAddOutlined />}>
          Tài khoản
        </Menu.Item>
        <Menu.Item key="bannermanagements" icon={<FundProjectionScreenOutlined />}>
          Banner
        </Menu.Item>
        <Menu.Item key="useronlines" icon={<UsergroupAddOutlined />}>
          Danh sách người dùng
        </Menu.Item> 
        <Menu.Item key="customersupports" icon={<CustomerServiceOutlined />}>
          Chăm sóc khách hàng
        </Menu.Item> 
        <Menu.Item key="shopdashboards" icon={<ShoppingOutlined />}>
          Cửa hàng
        </Menu.Item>
        <Menu.Item key="notifications" icon={<NotificationOutlined />}>
          Thông báo
        </Menu.Item> 
      </Menu>
    </Sider>
  );
};

export default Sidebar;
