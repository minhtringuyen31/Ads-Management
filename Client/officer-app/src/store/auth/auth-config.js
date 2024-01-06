const accessConstant = 'access_token';
const refreshConstant = 'refresh_token';

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
  localStorage.clear();
};
