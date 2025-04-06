import { requestWithAuth } from "./account";
// Lấy tất cả banner (không cần token)
 const getAllBanners = async () => {
  try {
    const response = await requestWithAuth("GET", "/banner");
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách banner:", error.message);
    throw error;
  }
};

// Tìm kiếm banner theo từ khóa
 const searchBanners = async (searchText) => {
  try {
    const response = await requestWithAuth("GET", `/banner/search?search=${encodeURIComponent(searchText)}`);
    return response;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm banner:", error.message);
    throw error;
  }
};

// Thêm banner mới (file + text)
 const addBanner = async (file, text) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    const response = await requestWithAuth("POST", "/banner/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi thêm banner:", error.message);
    throw error;
  }
};

// Cập nhật banner (file + text + id)
const updateBanner = async (id, file, text) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("text", text);
  
      if (file) {
        formData.append("file", file); // ✅ Chỉ thêm nếu file có giá trị
      }
  
      const response = await requestWithAuth("POST", "/banner/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response;
    } catch (error) {
      console.error("Lỗi khi cập nhật banner:", error.message);
      throw error;
    }
  };
  

// Xóa banner theo ID
 const deleteBanner = async (id) => {
  try {
    const response = await requestWithAuth("GET", `/banner/delete?id=${id}`);
    return response;
  } catch (error) {
    console.error("Lỗi khi xoá banner:", error.message);
    throw error;
  }
};
export { getAllBanners, searchBanners, addBanner, updateBanner, deleteBanner };