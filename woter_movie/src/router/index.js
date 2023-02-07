import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/mylogin',
            component: () => import('../views/MyLogin.vue')
        }
    ]
})

export default router