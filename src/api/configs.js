import axios from "axios";

const IP = "localhost"; 
const IPS = "192.168.56.2";
const BASE_URL_API = `http://${IP}:8080/api/v2/web`;
const BASE_URL_IMAGE = "http://" + IPS + ":8080/image/";

const API = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true, 
});

const HEADERS = {                     
  "Content-Type": "application/json",
};

export { API, BASE_URL_API, IP, IPS, BASE_URL_IMAGE, HEADERS };
