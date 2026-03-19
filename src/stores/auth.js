import { defineStore } from 'pinia';
import apiClient from '../lib/axios';

export const useAuthStore = defineStore('auth', {
    // 1. STATE: Initialize from localStorage to keep users logged in after a page refresh
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('access_token') || null,
    }),
    
    // 2. GETTERS: Computed properties for quick access in your Vue components
    getters: {
        isAuthenticated: (state) => !!state.token,
        
        // Ensures we only show the Instructor dashboard to actual instructors (Role ID 2)
        isInstructor: (state) => state.user?.role_id === 2,
        
        // Safe getter for the user's name to display in the top navigation bar
        userName: (state) => state.user?.name || 'Instructor',
    },

    // 3. ACTIONS: The methods that actually mutate the state and talk to Laravel
    actions: {
        async login(credentials) {
            try {
                // Send email and password to Laravel
                const response = await apiClient.post('/login', credentials);
                
                // Update Pinia state
                this.token = response.data.access_token;
                this.user = response.data.user;

                // Persist to browser storage
                localStorage.setItem('access_token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));

                return { success: true };
            } catch (error) {
                // Return a clean error message to the login form
                return { 
                    success: false, 
                    message: error.response?.data?.message || 'Invalid credentials. Please try again.' 
                };
            }
        },

        async logout() {
            try {
                // Tell Laravel to destroy the token in the database for true security
                if (this.token) {
                    await apiClient.post('/logout');
                }
            } catch (error) {
                console.error('Backend logout failed, proceeding with local logout.', error);
            } finally {
                // ALWAYS wipe the local state, even if the backend request fails
                this.user = null;
                this.token = null;
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                
                // Force redirect to the login page
                window.location.href = '/'; 
            }
        },

        // THE PRO FEATURE: Fetch fresh user data to ensure local storage isn't stale
        async fetchUser() {
            if (!this.token) return;
            
            try {
                const response = await apiClient.get('/user');
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                // If fetching the user fails (e.g., token expired), automatically log them out
                this.logout();
            }
        }
    }
});