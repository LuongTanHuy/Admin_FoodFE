import { requestWithAuth } from "./token";
// Hàm gọi API lấy danh mục
const getCategories = async () => {
  try {
    const data = await requestWithAuth("GET", "/category");
    return data; 
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error.message || error);
    return [];
  }
};


// Thêm danh mục
const addCategory = async (category, sale) => {
  try {
    const response = await requestWithAuth("POST", "/category/add", null, {
      params: { category, sale },
    });
    console.log("✅ Thêm danh mục thành công:", response);
    return response;
  } catch (error) {
    console.error("❌ Lỗi khi thêm danh mục:", error.response?.data || error.message);
    throw error;
  }
};
  

// Cập nhật danh mục
const updateCategory = async (idCategory, category, sale) => {
  try {
    return await requestWithAuth("POST", "/category/update", null, {
      params: { idCategory, category, sale },
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    throw error;
  }
};

const toggleCategoryStatus = async (id) => {
  try {
    return await requestWithAuth("GET", `/changeStatusCategory/${id}`);
  } catch (error) {
    console.error("❌ Lỗi khi đổi trạng thái danh mục:", error.response?.data || error.message);
    throw error;
  }
};


export { getCategories, addCategory, updateCategory, toggleCategoryStatus};
