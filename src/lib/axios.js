import axios from 'axios';

/**
 * Configure the base Axios instance.
 * Vite exposes environment variables via import.meta.env
 */
const apiClient = axios.create({
    // Added a fallback to '/api' just in case the .env variable is missing
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

/**
 * REQUEST INTERCEPTOR
 * Intercepts every outgoing request and injects the Bearer token
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // OPTIMIZATION: In Axios 1.x+, headers is an AxiosHeaders object. 
            // Using the bracket notation or .set() is safer than dot notation.
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * RESPONSE INTERCEPTOR
 * Intercepts incoming responses to handle global API errors.
 */
apiClient.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 401) {
            // 401 Unauthorized: The token is missing, invalid, or expired.
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            
            // Redirect to the login page (assuming your login page is at '/')
            // We check to ensure we aren't already on the login page to prevent infinite reload loops.
            if (window.location.pathname !== '/') {
                window.location.href = '/'; 
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;