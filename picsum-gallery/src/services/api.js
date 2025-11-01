import axios from 'axios';

const BASE_URL = 'https://picsum.photos';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


export const fetchPhotos = async (page = 1, limit = 30) => {
  try {
    const response = await api.get('/v2/list', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};


export const fetchPhotoDetails = async (id) => {
  try {
    const response = await api.get(`/id/${id}/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};


export const getPhotoUrl = (id, width, height = width) => {
  return `${BASE_URL}/id/${id}/${width}/${height}`;
};


export const getThumbnailUrl = (id) => {
  return getPhotoUrl(id, 400, 300);
};


export const getFullSizeUrl = (id, width, height) => {
  return getPhotoUrl(id, width, height);
};
