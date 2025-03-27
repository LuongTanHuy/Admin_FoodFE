import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, Image, message } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredBanners(banners.filter((banner) => banner.adText.toLowerCase().includes(value)));
  };

  // Validate file ảnh
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ chấp nhận ảnh định dạng JPG hoặc PNG!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải có kích thước nhỏ hơn 2MB!");
      return false;
    }
    return isJpgOrPng && isLt2M;
  };

  // Xử lý thêm banner
  const handleAdd = (values) => {
    if (!values.image || values.image.fileList.length === 0) {
      message.error("Vui lòng chọn ảnh!");
      return;
    }
    const newBanner = {
      id: banners.length + 1,
      image: URL.createObjectURL(values.image.file.originFileObj),
      adText: values.adText,
    };
    setBanners([...banners, newBanner]);
    setFilteredBanners([...banners, newBanner]);
    setIsModalOpen(false);
  };

  // Xử lý cập nhật banner
  const handleEdit = (values) => {
    const updatedBanners = banners.map((b) =>
      b.id === selectedBanner.id
        ? {
            ...b,
            adText: values.adText,
            image: fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : b.image,
          }
        : b
    );
    setBanners(updatedBanners);
    setFilteredBanners(updatedBanners);
    setIsEditModalOpen(false);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1e1e2e", color: "white", borderRadius: 10 }}>
      <h2>BANNER</h2>
      <Input
        placeholder="Tìm kiếm banner..."
        onChange={handleSearch}
        value={searchText}
        style={{ marginBottom: 20, width: 300 }}
        suffix={<SearchOutlined />}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ float: "right", marginBottom: 20 }}>
        Thêm
      </Button>

      <Table
        columns={[
          {
            title: "Banner",
            dataIndex: "image",
            key: "image",
            render: (src) => <Image width={150} src={src} />,
          },
          {
            title: "Quảng cáo",
            dataIndex: "adText",
            key: "adText",
          },
          {
            title: "Tùy chỉnh",
            key: "actions",
            render: (_, record) => (
              <>
                <Button icon={<EditOutlined />} onClick={() => setSelectedBanner(record) || setIsEditModalOpen(true)} style={{ marginRight: 8 }} />
                <Button icon={<DeleteOutlined />} danger onClick={() => setBanners(banners.filter((b) => b.id !== record.id))} />
              </>
            ),
          },
        ]}
        dataSource={filteredBanners}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        bordered
      />

      {/* Modal Thêm Mới */}
      <Modal title="Thêm Banner" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item label="Chọn Ảnh" name="image" rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}>
            <Upload beforeUpload={beforeUpload} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Nội dung quảng cáo" name="adText" rules={[{ required: true, message: "Nhập nội dung!" }, { max: 255, message: "Tối đa 255 ký tự!" }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Chỉnh Sửa */}
      <Modal title="Chỉnh Sửa Banner" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleEdit} layout="vertical">
          {selectedBanner && <Image width={200} src={selectedBanner.image} />}
          <Form.Item label="Thay đổi ảnh" name="image">
            <Upload beforeUpload={beforeUpload} listType="picture" maxCount={1} fileList={fileList} onChange={({ fileList }) => setFileList(fileList)}>
              <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Nội dung quảng cáo" name="adText" rules={[{ required: true, message: "Nhập nội dung!" }, { max: 255, message: "Tối đa 255 ký tự!" }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerManagement;
