import axios from "axios";

const IP = "localhost"; 
const BASE_URL_API = `http://${IP}:8080/api/v2/web/auth`;

const API = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cho phép gửi cookie (nếu backend cần xác thực bằng cookie)
});

export { API, BASE_URL_API, IP };
