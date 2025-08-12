// src/services/apiClient.ts
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // Base API URL
    headers: {
        "Content-Type": "application/json",
    },
});

//Add a request interceptor to include JWT
apiClient.interceptors.request.use(
(config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = 'Bearer ${token}';
    }
    return config;
},
    (error) => Promise.reject(error)
);

export default apiClient;