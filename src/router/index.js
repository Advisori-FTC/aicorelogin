import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lazy-loaded route components
const LoginPage = () => import('../views/LoginPage.vue')
const AppLayout = () => import('../layouts/AppLayout.vue')
const Dashboard = () => import('../views/dashboard/DashboardView.vue')
const DashboardOverview = () => import('../views/dashboard/Overview.vue')
const DashboardAnalytics = () => import('../views/dashboard/Analytics.vue')
const Users = () => import('../views/users/UsersView.vue')
const UsersList = () => import('../views/users/UsersList.vue')
const UserProfile = () => import('../views/users/UserProfile.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/app/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
          {
            path: '',
            redirect: '/app/dashboard/overview'
          },
          {
            path: 'overview',
            name: 'DashboardOverview',
            component: DashboardOverview
          },
          {
            path: 'analytics',
            name: 'DashboardAnalytics',
            component: DashboardAnalytics
          }
        ]
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        children: [
          {
            path: '',
            redirect: '/app/users/list'
          },
          {
            path: 'list',
            name: 'UsersList',
            component: UsersList
          },
          {
            path: 'profile',
            name: 'UserProfile',
            component: UserProfile
          }
        ]
      }
    ]
  },
  // Fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // If route requires authentication and user is not authenticated, redirect to login
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } 
  // If user is authenticated and trying to access login, redirect to dashboard
  else if (authStore.isAuthenticated && to.path === '/login') {
    next('/app/dashboard')
  }
  else {
    next()
  }
})

export default router
