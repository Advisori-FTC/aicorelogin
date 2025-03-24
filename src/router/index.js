import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/main'

// Lazy-loaded route components
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const ResetPassword = () => import('@/views/ResetPassword.vue')
const Home = () => import('@/views/Home.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: { requiresAuth: false }
  },
  // Fallback Route
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigationswache
router.beforeEach(async (to, from, next) => {
  // Prüfe, ob die Route eine Authentifizierung erfordert
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Hole die aktuelle Supabase-Session
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session
  
  // Benutzer nicht authentifiziert, aber Route erfordert Authentifizierung
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } 
  // Benutzer authentifiziert und versucht auf Login/Register zuzugreifen
  else if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
  } 
  // Sonst normale Navigation
  else {
    next()
  }
})

export default router
