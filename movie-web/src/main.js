import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'


import  vant  from 'vant';
import Toast  from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)


app.use(vant);
app.use(Toast);
app.use(router);
app.mount('#app');
