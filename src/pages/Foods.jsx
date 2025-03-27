import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, List, Avatar, Select, Upload, Image, message, InputNumber } from "antd";
import { PlusOutlined, EditOutlined, EyeInvisibleOutlined, SearchOutlined, MessageOutlined, UploadOutlined, SmileOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const Food = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [setEditingFood] = useState(null);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm] = Form.useForm();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  
  const [form] = Form.useForm();
  const [foodForm] = Form.useForm();

  const data = [
    {
      key: "1",
      image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg",
      category: "Nước",
      name: "Nước vui",
      price: "15.000 VNĐ",
      discount: "10% chỉ còn 13.500 VNĐ",
      sold: 0,
      revenue: "0.0 VNĐ",
      comments: [
        { text: "Rất ngon!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 1" },
        { text: "Tuyệt vời!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 2" },
      ],
    },
    {
      key: "2",
      image: "https://vnanet.vn/Data/Articles/2023/09/29/7006653/vna_potal_kien_giang_cung_co_ho_so_xu_ly_17_doi_tuong_su_dung_ma_tuy_trai_phep_stand.jpg",
      category: "Bột",
      name: "Bột lên thiên cảnh",
      price: "20.000 VNĐ",
      discount: "10% chỉ còn 18.000 VNĐ",
      sold: 2,
      revenue: "18.0 VNĐ",
      comments: [
        { text: "Rất ngon!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 1" },
        { text: "Tuyệt vời!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 2" },
      ],
    },
    {
      key: "3",
      image: "https://congan.laichau.gov.vn/assets/news/2024_06/image-20240619135025-2.jpeg",
      category: "Cỏ",
      name: "Cỏ mỹ",
      price: "50.000 VNĐ",
      discount: "15% chỉ còn 42.500 VNĐ",
      sold: 10,
      revenue: "425.000 VNĐ",
      comments: [
        { text: "Rất ngon!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 1" },
        { text: "Tuyệt vời!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 2" },
      ],
    },
    {
      key: "4",
      image: "https://congan.laichau.gov.vn/assets/news/2024_06/image-20240619135025-2.jpeg",
      category: "Cỏ",
      name: "Cỏ mỹ",
      price: "50.000 VNĐ",
      discount: "15% chỉ còn 42.500 VNĐ",
      sold: 10,
      revenue: "425.000 VNĐ",
      comments: [
        { text: "Rất ngon!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 1" },
        { text: "Tuyệt vời!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 2" },
      ],
    },
    {
      key: "5",
      image: "https://congan.laichau.gov.vn/assets/news/2024_06/image-20240619135025-2.jpeg",
      category: "Cỏ",
      name: "Cỏ mỹ",
      price: "50.000 VNĐ",
      discount: "15% chỉ còn 42.500 VNĐ",
      sold: 10,
      revenue: "425.000 VNĐ",
      comments: [
        { text: "Rất ngon!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 1" },
        { text: "Tuyệt vời!", image: "https://icdn.24h.com.vn/upload/4-2023/images/2023-10-25/nu--o----c-khoa--i-1698206425-187-width740height555.jpg", user: "Khách 2" },
      ],
    },
  ];

  // Lọc dữ liệu theo tìm kiếm
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase())
  );
  // Thêm món
  const handleAddFood = async () => {
    try {
      const values = await foodForm.validateFields();
      if (!imageUrl) {
        message.error("Vui lòng chọn ảnh món ăn!");
        return;
      }
  
      console.log("Dữ liệu món ăn:", values);
      setIsModalVisible(false);
      foodForm.resetFields();
      setImageUrl("");
      setFileList([]);
    } catch (error) {
      console.log("Validation thất bại:", error);
    }
  };
  
  // thêm danh mục
  const handleAddCategory = async () => {
    try {
      const values = await categoryForm.validateFields();
      console.log("Danh mục mới:", values);
      setIsCategoryModalVisible(false);
      categoryForm.resetFields();
    } catch (error) {
      console.log("Validation thất bại:", error);
    }
  };
  
  // edit món ăn
  const handleEdit = (record) => {
    setEditingFood(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      category: record.category,
    });
    setImageUrl(record.image); 
    setFileList([]);
    setIsEditModalVisible(true);
  };
  // edit danh muc
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    categoryForm.setFieldsValue({
      name: category.name,
      discount: category.discount,
    });
    setIsEditCategoryModalVisible(true);
  };

  // xem bình luận
  const handleOpenComments = (food) => {
    setSelectedFood(food);
    setComments(food.comments || []);
    setCommentsOpen(true);
  }

  const handleCloseComments = () => {
    setCommentsOpen(false);
    setSelectedFood(null);
    setReply("");
  }

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  }

  const handleSendReply = () => {
    console.log("Reply to", selectedFood.name, ":", reply);
    setReply("");
    handleCloseComments();
  }


  // lưu danh mục
  const handleSaveCategory = () => {
    categoryForm.validateFields().then((values) => {
      console.log("Cập nhật danh mục:", { ...editingCategory, ...values });
      setIsEditCategoryModalVisible(false);
    });
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  };
  
  
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (src) => <Image width={150} src={src} />,
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
      render: (_, record) => (
        <div>
          <p><b>Danh Mục:</b> {record.category}</p>
          <p><b>Tên Món:</b> {record.name}</p>
          <p><b>Giá gốc:</b> {record.price}</p>
          <p><b>Giảm Giá:</b> {record.discount}</p>
        </div>
      ),
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "sold",
      key: "sold",
      align: "center",

    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      align: "center",

    },
    {
      title: "Xem bình luận",
      key: "comment",
      align: "center",
      render: (_, record) => (
        <Button type="primary" icon={<MessageOutlined />} onClick={() => handleOpenComments(record)}>
          View
        </Button>
      ),
    },
    {
      title: "Tuỳ chỉnh",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 10 }} />
          <Button icon={<EyeInvisibleOutlined />} />
        </div>
      ),
    }    
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Món Ăn
      </Button>
      <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 10 }} onClick={() => setIsCategoryModalVisible(true)}>
        Danh Mục
      </Button>

      {/* Ô tìm kiếm */}
      <Search
        placeholder="Tìm kiếm theo tên hoặc danh mục"
        enterButton={<SearchOutlined />}
        style={{ width: 400, marginLeft: 20}}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 3 }}
        style={{ marginTop: 20 }}
      />

      {/* Modal Thêm Món Ăn */}
      <Modal
         title="Thêm Món"
         open={isModalVisible}
         onCancel={() => setIsModalVisible(false)}
         footer={null}
      >
             <Form 
             form={foodForm} 
             layout="vertical"
             onFinish={handleAddFood}
              >
               <Form.Item label="Hình ảnh" name="image" rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]} >
                 <Upload
                   listType="picture-card"
                   fileList={fileList}
                   onChange={handleUploadChange}
                   beforeUpload={() => false}
                   showUploadList={false}
                 >
                   {imageUrl ? <img src={imageUrl} alt="food" style={{ width: "100px", height: "100px" }} /> : <PlusOutlined />}
                 </Upload>
               </Form.Item>
     
               <Form.Item label="Tên món" name="name" rules={[{ required: true, message: "Vui lòng nhập tên món!" }]}>
                 <Input />
               </Form.Item>
     
               <Form.Item
                  label="Giá gốc"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá!" },
                    { pattern: /^[1-9]\d*$/, message: "Giá phải là số dương!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập giá món ăn"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); 
                      foodForm.setFieldsValue({ price: value });
                    }}
                  />
               </Form.Item>
               <Form.Item label="Danh mục món" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
                 <Select>
                   <Option value="Nước">Nước</Option>
                   <Option value="Bún">Bún</Option>
                 </Select>
               </Form.Item>
     
               <Button type="primary" htmlType="submit">
                 Thêm
               </Button>
             </Form>
      </Modal>

      {/* Modal Thêm Danh Mục */}
      <Modal
        title="Thêm Danh Mục"
        open={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
      >
        <Table
          pagination={{ pageSize: 3 }}
          style={{ marginTop: 20 }}
          columns={[
            {
              title: "Tên danh mục",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Hành động",
              key: "actions",
              render: (_, record) => (
                <div>
                  <Button icon={<EditOutlined />} onClick={() => handleEditCategory(record)} style={{ marginRight: 10 }} />
                  <Button icon={<EyeInvisibleOutlined />} />
                </div>
              ),
            },
          ]}
          dataSource={[
            { key: "1", name: "Nước" },
            { key: "2", name: "Bún" },
          ]}
        />
        <Form 
        layout="vertical"
        form= {form}
        onFinish={handleAddCategory}
        >
          <Form.Item 
          label="Loại danh mục món"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="Giảm giá (%)"
              name="discount"
              rules={[
                  { required: true, message: "Vui lòng nhập giảm giá!" },
                  { pattern: /^(100|[1-9]?[0-9])$/, message: "Nhập số từ 0 - 100!" },
                ]}
            >
          <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
              Thêm
          </Button>
        </Form>
      </Modal>

      {/* Modal Chỉnh Sửa Món Ăn */}
      <Modal
        title="Chỉnh sửa món ăn"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          {/* Upload Ảnh */}
          <Form.Item label="Hình ảnh">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} 
              showUploadList={false} 
            >
              {imageUrl ? (
                <img src={imageUrl} alt="food" style={{ width: "100%", height: "100px", objectFit: "cover" }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Các trường thông tin món ăn */}
          <Form.Item label="Tên món" name="name" rules={[{ required: true, message: "Vui lòng nhập tên món!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giá gốc" name="price" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Danh mục món" name="category">
            <Select>
              <Option value="Nước">Nước</Option>
              <Option value="Bột">Bột</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Cập nhật</Button>
        </Form>
      </Modal>

       {/* Modal Chỉnh Sửa Danh Mục */}
       <Modal
        title="Chỉnh sửa danh mục"
        open={isEditCategoryModalVisible}
        onCancel={() => setIsEditCategoryModalVisible(false)}
        onOk={handleSaveCategory}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={categoryForm} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[
              { required: true, message: "Vui lòng nhập giảm giá" },
              { type: "number", min: 0, max: 100, message: "Nhập từ 0 - 100" },
            ]}
          >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* modal bình luận */}
      <Modal
        title={`Bình luận cho ${selectedFood?.name}`}
        visible={commentsOpen}
        onCancel={handleCloseComments}
        onOk={handleSendReply}
        okText="Gửi"
        cancelText="Đóng"
      >
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={<Avatar src={comment.image} />}
                title={comment.user}
                description={comment.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={3}
          placeholder="Trả lời bình luận"
          value={reply}
          onChange={handleReplyChange}
        />
        <Upload>
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
        <Button icon={<SmileOutlined />} style={{ marginLeft: 8 }}>Chọn icon</Button>
      </Modal>

    </div>
  );
};

export default Food;
