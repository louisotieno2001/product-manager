import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: null,
        isAuthenticated: false
    }),
    
    actions: {
        async login(username: string, password: string) {
            const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
            this.token = response.data.token;
            this.user = response.data.user;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token);
        },
        logout() {
            this.token = '';
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        restoreSession() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
                this.user = user ? JSON.parse(user) : null;
            }
        }
    }
});
