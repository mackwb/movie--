import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})

export default router
