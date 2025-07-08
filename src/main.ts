import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入Element Plus样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入全局样式
import '@/assets/styles/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')