import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue')
const Index = () => import('../views/Index.vue')
const Video = () => import('../views/Video.vue')
const Home = () => import('../views/Home.vue')
const ViewXx= () => import('../views/ViewXx.vue')


const IndexOne = () => import('../views/Index/IndexOne.vue')
const IndexTwo = () => import('../views/Index/IndexTwo.vue')
const IndexThree = () => import('../views/Index/IndexThree.vue')
const IndexFour = () => import('../views/Index/IndexFour.vue')



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/viewXx',
      name:'viewXx',
      component:ViewXx
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/video',
          name: 'video',
          component: Video,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/index',
          name: 'index',
          component: Index,
          redirect: '/one',
          children: [
            {
              path: '/one',
              name: 'indexOne',
              component: IndexOne,
            },
            {
              path: '/two',
              name: 'indexTwo',
              component: IndexTwo,
            },
            {
              path: '/three',
              name: 'indexThree',
              component: IndexThree,
            },
            {
              path: '/Four',
              name: 'indexFour',
              component: IndexFour,
            },
          ]
        },
      ]
    },
  ]
})

export default router
