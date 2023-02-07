import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入swiper 轮博图
import "swiper/css/swiper.min.css"

import { List,Lazyload,Loading,Rate ,Overlay,Slider,Popup,Empty,Button,Toast,NoticeBar,Swipe, SwipeItem,Tab, Tabs,Cell, CellGroup,CouponCell, CouponList} from 'vant';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(List)
app.use(Empty)
app.use(Button)
app.use(Toast)
app.use(NoticeBar)
app.use(Swipe)
app.use(SwipeItem)
app.use(CouponCell)
app.use(CouponList)
app.use(Tab)
app.use(Tabs)
app.use(Cell)
app.use(CellGroup)
app.use(Loading)
app.use(Rate)
app.use(Overlay)
app.use(Slider)
app.use(Popup)
app.use(Lazyload)
app.mount('#app')

