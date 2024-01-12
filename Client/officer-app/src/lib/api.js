import axios from 'axios';
import instance from 'axiosConfig/axios-config';
import { GetRefreshToken } from 'store/auth/auth-config';

export const rootApi = 'http://webadvance.software';

// Locations API
export const getAllLocations = async () => {
  try {
    const response = await instance.get(`${rootApi}/locations`);
    const locationsData = response.data;

    if (response.statusText === 'OK') {
      return locationsData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

export const getLocationDetail = async (id) => {
  try {
    const response = await instance.get(`${rootApi}/location/${id}`);
    const locationData = response.data;

    if (response.statusText === 'OK') {
      return locationData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// District API
export const getAllDistricts = async () => {
  try {
    const response = await instance.get(`${rootApi}/districts`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

export const getWardsByDistrictId = async (id) => {
  try {
    const response = await instance.get(`${rootApi}/getWardsOfDistrict/${id}`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Ward API
export const getAllWards = async () => {
  try {
    const response = await instance.get(`${rootApi}/wards`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Ads Type API
export const getAllAdsType = async () => {
  try {
    const response = await instance.get(`${rootApi}/adstypes`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Location API
export const getAllLocationType = async () => {
  try {
    const response = await instance.get(`${rootApi}/locationtypes`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Ads Board Type API
export const getAllAdsBoardType = async () => {
  try {
    const response = await instance.get(`${rootApi}/adsboardtypes`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Report API
export const getAllReports = async () => {
  try {
    const response = await instance.get(`${rootApi}/reports`);
    const reportsData = response.data;

    if (response.statusText === 'OK') {
      return reportsData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

export const getAllReportByLocation = async () => {
  try {
    const response = await instance.get(`${rootApi}/reportGroup`);
    const reportsData = response.data;

    if (response.statusText === 'OK') {
      return reportsData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

export const getReportDetail = async (id) => {
  try {
    const response = await instance.get(`${rootApi}/report/${id}`);
    const reportsData = response.data;

    if (response.statusText === 'OK') {
      console.log(reportsData.data);
      return reportsData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Ads Board API
export const getAllAdsBoards = async () => {
  try {
    const response = await instance.get(`${rootApi}/adsboards`);
    const data = response.data;

    if (response.statusText === 'OK') {
      return data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Refresh Token Api
export const refreshToken = async () => {
  try {
    const refresh_token = GetRefreshToken();
    const response = await axios.post(`${rootApi}/refresh`, {
      refreshToken: refresh_token,
    });

    const tokenData = response.data;

    if (response.statusText === 'OK') {
      return {
        newAccessToken: tokenData.accessToken,
        newRefreshToken: tokenData.refreshToken,
      };
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Login
export const login = async ({ loginCredential, password }) => {
  try {
    const response = await instance.post(`${rootApi}/auth/login`, {
      loginCredential: loginCredential,
      password: password,
    });

    const authData = response.data;

    if (response.statusText === 'OK') {
      return authData;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};

// Authorize Request
export const getAllAuthorizeRequest = async () => {
  try {
    const response = await instance.get(`${rootApi}/authorizeRequests`);

    const authData = response.data;

    if (response.statusText === 'OK') {
      return authData.data;
    } else {
      throw new Error('Could not fetch data.');
    }
  } catch (error) {
    throw new Error('Request failed: ' + error.message);
  }
};
