import axios, {AxiosInstance} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.34:3000', // Replace with your server URL
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
