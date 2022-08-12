import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import preventReClick from "@/directive/index.js"
import Particles from 'particles.vue3'
import store from "@/store/index.js"
import { getCookie } from '@/utils/cookies.js';


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        let token = JSON.parse(getCookie('result'))
        //console.log(token)
        if (token == null || token == '') {
            next('/login');
        } else {
            next();
        }
    }
});

let app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(Particles)

app.directive('preventReClick', preventReClick)
app.mount('#app');