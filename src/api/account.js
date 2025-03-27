import { API } from "../api/configs";

// Lưu tokens vào localStorage
const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Lấy tokens từ localStorage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Đăng nhập
const login = async (email, password) => {
  try {
    const response = await API.post("/checkLogin", null, {
      params: { email, password },
    });

    if (response.data.accessToken) {
      saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.response?.data || error.message);
    return { error: "Sai tài khoản hoặc mật khẩu hoặc lỗi server" };
  }
};

// Làm mới token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("Không tìm thấy refresh token");

    const response = await API.post("/refreshToken", { refreshToken });

    if (response.status === 200 && response.data.accessToken) {
      saveTokens(response.data.accessToken, refreshToken);
      return response.data.accessToken;
    }
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error.response?.data || error.message);
    localStorage.clear(); // Xóa token khi refresh thất bại
    return null;
  }
};

// Gửi request có authentication
const requestWithAuth = async (method, url, data = null) => {
  try {
    let accessToken = getAccessToken();
    console.log("🔍 Token được gửi đi:", accessToken); // Thêm log để kiểm tra
    const headers = { Authorization: `Bearer ${accessToken}` };

    const response = await API.request({ method, url, data, headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Access token hết hạn, đang làm mới...");
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        return requestWithAuth(method, url, data);
      } else {
        console.log("Phiên làm việc hết hạn, đăng xuất...");
        localStorage.clear();
        throw new Error("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.");
      }
    }
    throw error;
  }
};


// Tự động làm mới token mỗi 15 phút
const startTokenRefreshInterval = () => {
  setInterval(async () => {
    console.log("Làm mới access token...");
    await refreshAccessToken();
  }, 15 * 60 * 1000);
};

export { login, refreshAccessToken, requestWithAuth, startTokenRefreshInterval };
