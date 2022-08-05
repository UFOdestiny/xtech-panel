import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import preventReClick from "@/directive/index.js"
//import Particles from 'particles.vue3'
import store from "@/store/index.js"

let app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
//app.use(Particles)

app.directive('preventReClick', preventReClick)
app.mount('#app');