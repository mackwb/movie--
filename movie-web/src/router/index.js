import { createRouter, createWebHistory } from 'vue-router'
// import updateToken from '../api/'
import { useStore } from "vuex";

const store = useStore()

const Login = () => import('../views/Login.vue')
const Index = () => import('../views/Index.vue')
const Video = () => import('../views/Video.vue')
const Home = () => import('../views/Home.vue')
const ViewXx = () => import('../views/ViewXx.vue')
const AAA = () => import('../views/AAA.vue')
const HomeVideo = () => import('../views/HomeVideo.vue')



const IndexOne = () => import('../views/Index/IndexOne.vue')
const IndexTwo = () => import('../views/Index/IndexTwo.vue')
const IndexThree = () => import('../views/Index/IndexThree.vue')
const IndexFour = () => import('../views/Index/IndexFour.vue')

const VideoOne = () => import('../views/Video/VideoOne.vue')
const VideoTwo = () => import('../views/Video/VideoTwo.vue')


let beforeEnter = (to, from, next) => {
  let token = window.localStorage.getItem("token");
  // 判断是否登录
  if (!token) {
    console.log(123);
    next("login");
    return;
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //第一页
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index/one',
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'video',
          name: 'video',
          component: Video,
          redirect:'video/videoOne',
          beforeEnter:beforeEnter,
          children: [
            {
              path: 'videoOne',
              name: 'videoOne',
              component: VideoOne,
            },
            {
              path: 'videoTwo',
              name: 'videoTwo',
              component: VideoTwo,
            },
          ]
        },
        {
          path: 'index',
          name: 'index',
          component: Index,
          beforeEnter:beforeEnter,
          children: [
            {
              path: 'one',
              name: 'indexOne',
              component: IndexOne,
            },
            {
              path: 'two',
              name: 'indexTwo',
              component: IndexTwo
            },
            {
              path: 'three',
              name: 'indexThree',
              component: IndexThree
            },
            {
              path: 'four',
              name: 'indexFour',
              component: IndexFour
            }
          ],
        }
      ]
    },
    // 第二页
    {
      path: '/viewXx',
      name: 'viewXx',
      component: ViewXx,
    },
    {
      path: '/homeVideo',
      name: 'homeVideo',
      component: HomeVideo
    },
    //第三页


  ]
})



export default router
