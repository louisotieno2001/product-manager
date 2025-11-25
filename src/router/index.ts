import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/Login.vue';
import ProductList from '../pages/Products.vue';
import ViewProductPage from '../pages/ProductDetails.vue';
import AddProductPage from '../pages/AddProduct.vue';
import HomePage from '../pages/Home.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
    { path: '/', component: HomePage, meta: { requiresAuth: false }},
    { path: '/login', component: LoginPage, meta: { requiresAuth: false }},
    { path: '/products', component: ProductList, meta: { requiresAuth: true }},
    { path: '/products/:id', component: ViewProductPage, meta: { requiresAuth: true }},
    { path: '/products/new', component: AddProductPage, meta: { requiresAuth: true }}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
