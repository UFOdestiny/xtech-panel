import { createRouter, createWebHashHistory } from "vue-router"
import { getCookie } from '@/utils/cookies.js';

const EchartContainer = () => import("@/components/EchartContainer.vue")
const login = () => import("@/views/Login/index.vue")

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/EchartContainer",
    name: "EchartContainer",
    component: EchartContainer,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },

]

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = JSON.parse(getCookie('result'))
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});


export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})