import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue')
const Index = () => import('../views/Index.vue')
const IndexOne = () => import('../views/Index/IndexOne.vue')
const IndexTwo = () => import('../views/Index/IndexTwo.vue')
const IndexThree = () => import('../views/Index/IndexThree.vue')
const IndexFour = () => import('../views/Index/IndexFour.vue')



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/index/one',
      children: [
        {
          path: 'index/one',
          name: 'indexOne',
          component: IndexOne,
        },
        {
          path: 'index/two',
          name: 'indexTwo',
          component: IndexTwo,
        },
        {
          path: 'index/three',
          name: 'indexThree',
          component: IndexThree,
        },
        {
          path: 'index/four',
          name: 'indexFour',
          component: IndexFour,
        }
      ]
    }
  ]
})

export default router
