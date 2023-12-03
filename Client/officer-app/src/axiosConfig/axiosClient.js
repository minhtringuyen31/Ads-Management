import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3005/", // Điều chỉnh địa chỉ gốc của API
  baseURL: "http://localhost:3000/api/",
  // baseURL: "http://localhost:3000/",
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu
  headers: {
    "Content-Type": "application/json",
    // Các header khác tùy theo yêu cầu của API
  },
});

// export const get = (url, params) => instance.get(url, { params });
// export const post = (url, data) => instance.post(url, data);
// export const put = (url, data) => instance.put(url, data);
// export const del = (url) => instance.delete(url);
export default axiosClient;
