import React, { useEffect, useRef } from "react";
import { Card, Typography, List, Avatar } from "antd";
import { ShopOutlined, HomeOutlined, MailOutlined, PhoneOutlined, BellOutlined } from "@ant-design/icons";
import "../css/ShopDashboard.css";

const { Title, Text } = Typography;

const notifications = [
  { id: 1, type: "order", message: "📦 Đơn hàng mới từ Nguyễn Văn A", time: "10 phút trước" },
  { id: 2, type: "comment", message: "💬 Bình luận mới từ Trần Thị B", time: "30 phút trước" },
  { id: 3, type: "order", message: "📦 Đơn hàng mới từ Lê Văn C", time: "1 giờ trước" },
  { id: 4, type: "review", message: "⭐ Đánh giá mới từ Mai Thị D", time: "2 giờ trước" },
  { id: 5, type: "review", message: "⭐ Đánh giá mới từ Mai Thị D", time: "4 giờ trước" },
  { id: 6, type: "review", message: "⭐ Đánh giá mới từ Mai Thị Cặc", time: "2 giờ trước" },
  { id: 7, type: "review", message: "⭐ Đánh giá mới từ Mai Thị Lol", time: "4 giờ trước" },
  { id: 8, type: "review", message: "⭐ Đánh giá mới từ Văn Thị D", time: "2 giờ trước" },
  { id: 9, type: "review", message: "⭐ Đánh giá mới từ Cặc Thị D", time: "7 giờ trước" },
];

const ShopDashboard = () => {
  const notificationRef = useRef(null);

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
          <img
            src="https://chillvietnam.com/wp-content/uploads/elementor/thumbs/new-mdm-club-thien-duong-an-choi-so-1-dat-cang-hai-phong-1671619642-q0mn9um4jj8qz7gv7zwkfkb5q55pjttip7y3y1poko.jpeg"
            alt="Shop"
            className="shop-image"
          />

          <div className="shop-details">
            <Title level={3} className="shop-title">
              <ShopOutlined className="icon" /> Cửa Hàng ABC
            </Title>
            <Text className="shop-text">
              <HomeOutlined className="icon text-blue" /> 123 Đường ABC, TP.HCM
            </Text>
            <Text className="shop-text">
              <MailOutlined className="icon text-red" /> shopabc@example.com
            </Text>
            <Text className="shop-text">
              <PhoneOutlined className="icon text-green" /> 0123 456 789
            </Text>
          </div>
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
                  avatar={<Avatar className="notification-avatar">{item.message.charAt(0)}</Avatar>}
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
