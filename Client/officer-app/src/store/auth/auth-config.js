const accessConstant = 'access_token';
const refreshConstant = 'refresh_token';
const userConstant = 'user';

export const GetRefreshToken = () => {
  return localStorage.getItem(refreshConstant);
};

export const GetAccessToken = () => {
  return localStorage.getItem(accessConstant);
};

export const StoreToken = ({ accessToken, refreshToken }) => {
  localStorage.setItem(accessConstant, accessToken);
  localStorage.setItem(refreshConstant, refreshToken);
};

export const RemoveToken = () => {
  localStorage.removeItem(accessConstant);
  localStorage.removeItem(refreshConstant);
};

export const StoreUser = (user) => {
  localStorage.setItem(userConstant, JSON.stringify(user));
};

export const GetUser = () => {
  return JSON.parse(localStorage.getItem(userConstant));
};

export const RemoveUser = () => {
  localStorage.removeItem(userConstant);
};
