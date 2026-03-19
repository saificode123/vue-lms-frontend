import axios from 'axios';

/**
 * Configure the base Axios instance.
 * Vite exposes environment variables via import.meta.env
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

/**
 * REQUEST INTERCEPTOR
 * Intercepts every outgoing request and injects the Bearer token
 * if the user is currently logged in.
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 401) {
            // 401 Unauthorized: The token is missing, invalid, or expired.
            // Clear the stale data and force the user back to the login screen.
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            
            // Redirect to the root (Login page)
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;