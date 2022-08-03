import { createRouter, createWebHashHistory } from "vue-router"


const kline = () => import("@/components/KlineGraph.vue")

const routes = [
  { path: "/", redirect: "/kline" },
  {
    path: "/kline",
    name: "kline",
    component: kline
  },

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})