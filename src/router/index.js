import { createRouter, createWebHashHistory } from "vue-router"


const EchartContainer = () => import("@/components/EchartContainer.vue")
const login = () => import("@/views/Login/index.vue")
const MainPage = () => import("@/views/MainPage.vue")

const KlineGraph = () => import("@/components/KlineGraph.vue")

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
  {
    path: "/MainPage",
    name: "MainPage",
    component: MainPage,
    children: [
      {
        path: "/EchartContainer2",
        component: EchartContainer,
      },
      {
        path: "/kline",
        component: KlineGraph,
      }
    ]
  },

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})