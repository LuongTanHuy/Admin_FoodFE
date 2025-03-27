import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Foods from "./pages/Foods";
import Orders from "./pages/Orders";
import Statistics from "./pages/Statistics";
import AccountList from "./pages/AccountList";
import StoreList from "./pages/StoreList";
import BannerManagement from "./pages/BannerManagement";
import Dashboard from "./pages/Dashboards";
import NotFound from "./pages/NotFound";
import OnlineUsers from "./pages/OnlineUsers";
import CustomerSupports from "./pages/CustomerSupports";
import ShopDashboards from "./pages/ShopDashBoards";
import NotificationSender from "./pages/NotificationSenders";
import Login from "./pages/Login";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Kiểm tra nếu không phải trang login thì mới hiển thị sidebar */}
      {location.pathname !== "/login" && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}

      <Layout
        style={{
          marginLeft: location.pathname !== "/login" ? (collapsed ? 80 : 200) : 0, 
          transition: "margin-left 0.3s ease",
          padding: "15px",
        }}
      >
        <Layout.Content style={{ background: "#f0f2f5", padding: "20px", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboards" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/storelist" element={<StoreList />} />
            <Route path="/bannermanagements" element={<BannerManagement />} />
            <Route path="/useronlines" element={<OnlineUsers />} />
            <Route path="/customersupports" element={<CustomerSupports />} />
            <Route path="/shopdashboards" element={<ShopDashboards />} />
            <Route path="/notifications" element={<NotificationSender />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

// Gói Router lại để dùng useLocation
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
