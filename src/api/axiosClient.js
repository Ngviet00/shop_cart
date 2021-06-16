import axios from 'axios';

const axiosClient = axios.create({
   baseURL: 'https://60befc95320dac0017be43c4.mockapi.io/api/',
   headers: {
      'Content-type': 'application/json',
   },
});

axiosClient.interceptors.request.use(function (config) {
   return config;
}, function (error) {
   return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   return Promise.reject(error);
});

export default axiosClient;