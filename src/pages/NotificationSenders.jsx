import React, { useState } from "react";
import { Card, Input, Button, Typography, Upload, Row, Col, message } from "antd";
import { UploadOutlined, TagOutlined, GiftOutlined, FireOutlined, StarOutlined, CommentOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  uploadBtn: {
    width: "100%",
    marginBottom: "10px",
  },
  previewImg: {
    width: "100%",
    maxHeight: "150px",
    marginBottom: "10px",
    borderRadius: "5px",
    objectFit: "cover",
  },
  sendBtn: {
    width: "100%",
    marginTop: "10px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

// Màu sắc riêng cho từng ô
const cardColors = {
  promo: "#f8d7da",
  discount: "#d1ecf1",
  newDish: "#d4edda",
  bestSeller: "#fff3cd",
  userReply: "#d6d8db",
};

const NotificationSender = () => {
  const [notifications, setNotifications] = useState({
    promo: { text: "", image: null, error: "" },
    discount: { text: "", image: null, error: "" },
    newDish: { text: "", image: null, error: "" },
    bestSeller: { text: "", image: null, error: "" },
    userReply: { text: "", image: null, error: "" },
  });

  // Hàm xử lý thay đổi nội dung
  const handleChangeText = (type, value) => {
    let error = "";
    if (value.length > 300) {
      error = "Nội dung không được vượt quá 300 ký tự!";
    }
    setNotifications((prev) => ({
      ...prev,
      [type]: { ...prev[type], text: value, error },
    }));
  };

  // Hàm xử lý tải ảnh lên
  const handleUpload = (type, file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
      setNotifications((prev) => ({
        ...prev,
        [type]: { ...prev[type], error: "Chỉ chấp nhận ảnh JPG hoặc PNG!" },
      }));
      return false;
    }
    if (!isLt2M) {
      setNotifications((prev) => ({
        ...prev,
        [type]: { ...prev[type], error: "Ảnh phải nhỏ hơn 2MB!" },
      }));
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setNotifications((prev) => ({
        ...prev,
        [type]: { ...prev[type], image: e.target.result, error: "" },
      }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Hàm kiểm tra và gửi thông báo
  const handleSend = (type) => {
    const { text, image } = notifications[type];

    if (!text.trim()) {
      setNotifications((prev) => ({
        ...prev,
        [type]: { ...prev[type], error: "Nội dung thông báo không được để trống!" },
      }));
      return;
    }

    if (!image) {
      setNotifications((prev) => ({
        ...prev,
        [type]: { ...prev[type], error: "Vui lòng chọn ảnh trước khi gửi!" },
      }));
      return;
    }

    console.log(`Thông báo gửi đi (${type}):`, notifications[type]);
    message.success(`Thông báo "${type}" đã được gửi thành công!`);

    // Reset nội dung sau khi gửi thành công
    setNotifications((prev) => ({
      ...prev,
      [type]: { text: "", image: null, error: "" },
    }));
  };

  return (
    <div style={styles.container}>
      <Title level={2}>Thông báo người dùng</Title>

      <Row gutter={[16, 16]}>
        {[
          { key: "promo", icon: <TagOutlined />, title: "Chương Trình Khuyến Mãi" },
          { key: "discount", icon: <GiftOutlined />, title: "Giảm Giá & Voucher" },
          { key: "newDish", icon: <FireOutlined />, title: "Món Mới Ra Mắt" },
          { key: "bestSeller", icon: <StarOutlined />, title: "Món Best Seller" },
          { key: "userReply", icon: <CommentOutlined />, title: "Trả Lời Phản Hồi" },
        ].map(({ key, icon, title }) => (
          <Col xs={24} sm={12} key={key}>
            <Card style={{ ...styles.card, background: cardColors[key] }}>
              <Title level={4} style={{ textAlign: "left" }}>
                {icon} {title}
              </Title>

              <Upload
                showUploadList={false}
                beforeUpload={(file) => handleUpload(key, file)}
              >
                <Button icon={<UploadOutlined />} style={styles.uploadBtn}>
                  Chọn Ảnh Banner
                </Button>
              </Upload>

              {notifications[key].image && (
                <img src={notifications[key].image} alt="Preview" style={styles.previewImg} />
              )}

              <TextArea
                rows={3}
                placeholder="Nhập nội dung..."
                value={notifications[key].text}
                onChange={(e) => handleChangeText(key, e.target.value)}
              />

              {/* Hiển thị lỗi nếu có */}
              {notifications[key].error && (
                <div style={styles.errorText}>{notifications[key].error}</div>
              )}

              <Button type="primary" style={styles.sendBtn} onClick={() => handleSend(key)}>
                Gửi Thông Báo
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NotificationSender;
