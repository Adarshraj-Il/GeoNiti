import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Your backend URL
    withCredentials: true,            // VERY IMPORTANT: Allows sending/receiving cookies
});

export default api;
