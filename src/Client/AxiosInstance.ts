import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

const axiosInstance = axios.create({
                                       baseURL        : API_URL,
                                       withCredentials: false,
                                   });

// Function to refresh token
const refreshToken = async() => {
    try{
        const response = await axiosInstance.post(`/auth/refresh`, null, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        const newToken = response.data.authorization.token;
        localStorage.setItem('token', newToken);
        return newToken;
    }
    catch(error){
        window.location.href = '/login'; // Redirect to log in if refresh fails
        throw error;
    }
};

// Request Interceptor - Add Access Token
axiosInstance.interceptors.request.use(async(config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    throw error;
});

// Response Interceptor - Handle Expired Token
axiosInstance.interceptors.response.use((response) => response, async(error) => {
    const originalRequest = error.config;

    // If token expired (401 Unauthorized) & request is NOT retrying
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true; // Mark request as retried

        try{
            const newToken                           = await refreshToken(); // Get a new token
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest); // Retry the failed request
        }
        catch(refreshError){
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;
