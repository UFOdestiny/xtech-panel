import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import preventReClick from "@/directive/index.js"
let app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.directive('preventReClick', preventReClick)
app.mount('#app');