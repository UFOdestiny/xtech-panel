import { createRouter, createWebHashHistory } from "vue-router"


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

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})