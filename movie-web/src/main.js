import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/store/index2';
// import vant from 'vant'
// 1. 引入你需要的组件
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { Divider } from 'vant';
import { Sticky } from 'vant';
import { SwipeCell } from 'vant';
import { List } from 'vant';
import { Form, Field, CellGroup } from 'vant';
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import { Notify } from 'vant';
import createPersistedState from "vuex-persistedstate";




// 2. 引入组件样式
import 'vant/lib/index.css';

// import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(NavBar)
app.use(Button)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(Tab);
app.use(Tabs);
app.use(Divider);
app.use(Sticky);
app.use(SwipeCell);
app.use(List);
app.use(vue3videoPlay)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Notify);
app.use(createPersistedState)
// app.use(vant)






app.mount('#app')
