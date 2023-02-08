import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
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








// 2. 引入组件样式
import 'vant/lib/index.css';

// import './assets/main.css'

const app = createApp(App)

app.use(router)
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







app.mount('#app')
