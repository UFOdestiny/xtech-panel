import { createRouter, createWebHashHistory } from "vue-router"


const kline = () => import("@/components/KlineGraph.vue")
const login = () => import("@/views/Login/index.vue")

const routes = [
  { path: "/", redirect: "/kline" },
  {
    path: "/kline",
    name: "kline",
    component: kline,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },


]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})