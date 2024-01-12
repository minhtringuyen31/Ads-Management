import axios from 'axios';
import { refreshToken } from 'lib/api';
import {
  GetAccessToken,
  RemoveToken,
  StoreToken,
} from 'store/auth/auth-config';

const instance = axios.create({
  baseURL: 'http://webadvance.software',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${GetAccessToken()}`;
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401) {
      config.sent = true;

      try {
        const { newAccessToken, newRefreshToken } = await refreshToken();
        if (newAccessToken && newRefreshToken) {
          StoreToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
          const newConfig = { ...config };
          newConfig.headers.Authorization = `Bearer ${GetAccessToken()}`;

          return axios(newConfig);
        } else {
          RemoveToken();
          window.location.href = '/admin_dashboard/login';
        }
      } catch (error) {
        RemoveToken();
        window.location.href = '/admin_dashboard/login';
        throw new Error('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    }
  }
);

export default instance;
