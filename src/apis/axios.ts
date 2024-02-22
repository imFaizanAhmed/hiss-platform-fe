import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  // You can add more default settings here
});

export default axiosInstance;