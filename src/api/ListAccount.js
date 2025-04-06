import { requestWithAuth } from "./account";

//Lấy thông tin tài khoản hiện tại (từ token)
 const getAccountInfo = async () => {
  try {
    const data = await requestWithAuth("GET", "/account/information");
    return data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin tài khoản:", error);
    throw error;
  }
};

//Lấy danh sách tài khoản (có phân trang)
 const getAllAccounts = async (page = 0, size = 20) => {
  try {
    const data = await requestWithAuth("GET", `/list-account?page=${page}&size=${size}`);
    return data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách tài khoản:", error);
    throw error;
  }
};

//Tìm kiếm tài khoản theo từ khóa
 const searchAccounts = async (keyword) => {
  try {
    const data = await requestWithAuth("GET", `/account/search?search=${encodeURIComponent(keyword)}`);
    return data;
  } catch (error) {
    console.error("❌ Lỗi khi tìm kiếm tài khoản:", error);
    throw error;
  }
};

export { getAccountInfo, getAllAccounts, searchAccounts}
