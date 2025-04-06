import React, { useEffect, useRef, useState } from "react";
import { Card, Typography, List, Avatar } from "antd";
import {
  ShopOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "../css/ShopDashboard.css";
import { getUserInfo } from "../api/account";
import { BASE_URL_IMAGE } from "../api/configs";

const { Title, Text } = Typography;

const notifications = [
  { id: 1, type: "order", message: "📦 Đơn hàng mới từ Nguyễn Văn A", time: "10 phút trước" },
  { id: 2, type: "comment", message: "💬 Bình luận mới từ Trần Thị B", time: "30 phút trước" },
  { id: 3, type: "order", message: "📦 Đơn hàng mới từ Lê Văn C", time: "1 giờ trước" },
  { id: 4, type: "review", message: "⭐ Đánh giá mới từ Mai Thị D", time: "2 giờ trước" },
  { id: 5, type: "review", message: "⭐ Đánh giá mới từ Văn Thị D", time: "4 giờ trước" },
  { id: 6, type: "review", message: "⭐ Đánh giá mới từ Nguyễn Văn E", time: "7 giờ trước" },
];

const ShopDashboard = () => {
  const notificationRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        console.log("Thông tin tài khoản:", data);
        setUserInfo(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const notificationBox = notificationRef.current;
    let scrollTimeout;

    const handleScroll = () => {
      notificationBox.classList.add("scrolling");

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        notificationBox.classList.remove("scrolling");
      }, 1000); // 1 giây sau khi dừng cuộn thì ẩn thanh cuộn
    };

    if (notificationBox) {
      notificationBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (notificationBox) {
        notificationBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Layout chính: Chia 2 cột */}
      <div className="dashboard-grid">
        {/* Thông tin cửa hàng */}
        <Card className="shop-info">
          {userInfo ? (
            <>
             <img
              src={userInfo.image ? `${BASE_URL_IMAGE}${userInfo.image}` : "/default-avatar.png"}
              alt="Shop"
              className="shop-image"
              
            />

              <div className="shop-details">
                <Title level={3} className="shop-title">
                  <ShopOutlined className="icon" /> {userInfo.username}
                </Title>
                <Text className="shop-text">
                  <HomeOutlined className="icon text-blue" /> {userInfo.address}
                </Text>
                <Text className="shop-text">
                  <MailOutlined className="icon text-red" /> {userInfo.email}
                </Text>
                <Text className="shop-text">
                  <PhoneOutlined className="icon text-green" /> {userInfo.phone}
                </Text>
              </div>
            </>
          ) : (
            <Text>Đang tải dữ liệu...</Text>
          )}
        </Card>

        {/* Danh sách thông báo */}
        <Card className="notifications" ref={notificationRef}>
          <Title level={3} className="notification-title">
            <BellOutlined className="icon" /> Thông Báo
          </Title>
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item className="notification-item">
                <List.Item.Meta
                  avatar={
                    <Avatar className="notification-avatar">
                      {item.message.charAt(0)}
                    </Avatar>
                  }
                  title={<Text className="notification-message">{item.message}</Text>}
                  description={<Text className="notification-time">{item.time}</Text>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default ShopDashboard;
