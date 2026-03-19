import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// 1. STANDARD IMPORT: Loads immediately so the login screen appears instantly
import LoginView from '../views/LoginView.vue';

// 2. LAZY IMPORTS: These only download from the server IF the user logs in.
// This keeps your initial application payload incredibly small and fast.
const DashboardLayout = () => import('../layouts/DashboardLayout.vue');
const DashboardView = () => import('../views/DashboardView.vue');
const CreateCourseView = () => import('../views/courses/CreateCourseView.vue');
const CurriculumBuilderView = () => import('../views/courses/CurriculumBuilderView.vue');
const MyCoursesView = () => import('../views/courses/MyCoursesView.vue');

const router = createRouter({
  // Use HTML5 History API for clean URLs (no '#' in the URL)
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      // 'requiresGuest' means if they are ALREADY logged in, redirect them away
      meta: { requiresGuest: true } 
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      // 'requiresAuth' locks this entire branch behind the login screen
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '', // Matches exactly '/dashboard'
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'courses',
          name: 'courses.index',
          component: MyCoursesView
        },
        { 
          path: 'courses/create', 
          name: 'courses.create', 
          component: CreateCourseView 
        },
        {
          path: 'courses/:id/curriculum',
          name: 'courses.curriculum',
          component: CurriculumBuilderView
        }
      ]
    },
    {
      // 3. CATCH-ALL ROUTE (404 Fallback)
      // Safely catches any invalid URL typed by the user
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

/**
 * 4. GLOBAL NAVIGATION GUARD (The Bouncer)
 * Runs before every single page transition to enforce security.
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // SCENARIO A: Trying to access a secure page without being logged in
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } 
  
  // SCENARIO B: Already logged in but trying to visit the Login page
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' });
  } 
  
  // SCENARIO C: All rules passed, let them through
  else {
    next();
  }
});

export default router;