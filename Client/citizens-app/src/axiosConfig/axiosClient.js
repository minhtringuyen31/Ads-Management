import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://14.225.192.121/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
