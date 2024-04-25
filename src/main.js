import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// import 'dayjs/locale/zh-cn'; // 如果需要中文显示，可以引入相应的语言包
const app = createApp(App)

app.use(createPinia().use(persist))
app.use(router)
app.use(ArcoVueIcon)
app.use(ArcoVue);
app.mount('#app')
