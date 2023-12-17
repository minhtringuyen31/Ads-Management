import axios from 'axios';

const rootApi = 'http://14.225.192.121/api';

// Locations API
export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${rootApi}/locations`);
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

// District API
export const getAllDistricts = async () => {
  try {
    const response = await axios.get(`${rootApi}/districts`);
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

// Ward API
export const getAllWards = async () => {
  try {
    const response = await axios.get(`${rootApi}/wards`);
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

// Report API
export const getAllReports = async () => {
  try {
    const response = await axios.get(`${rootApi}/reports`);
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

// Ads Board API
export const getAllAdsBoards = async () => {
  try {
    const response = await axios.get(`${rootApi}/adsboards`);
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
