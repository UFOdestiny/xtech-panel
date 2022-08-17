import { createRouter, createWebHashHistory } from "vue-router"



const login = () => import("@/views/Login/index.vue")
const MainPage = () => import("@/views/MainPage.vue")

const NotionalPrincipal = () => import("@/components/NotionalPrincipal/NotionalPrincipal.vue")
const Volatility = () => import("@/components/Volatility/Volatility.vue")
const CPR = () => import("@/components/CPR/CPR.vue")
const PremiumDiscount = () => import("@/components/PremiumDiscount/PremiumDiscount.vue")
const Skewness = () => import("@/components/Skewness/Skewness.vue")
const SmileSurface = () => import("@/components/SmileSurface/SmileSurface.vue")
const IVDiff = () => import("@/components/IVDiff/IVDiff.vue")
const IVATM = () => import("@/components/IVATM/IVATM.vue")
const VerticalSpread = () => import("@/components/VerticalSpread/VerticalSpread.vue")

const routes = [
  { path: "/", redirect: "/MainPage" },
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
      { path: "/NotionalPrincipal", component: NotionalPrincipal, },
      { path: "/Volatility", component: Volatility, },
      { path: "/CPR", component: CPR, },
      { path: "/PremiumDiscount", component: PremiumDiscount, },
      { path: "/Skewness", component: Skewness, },
      { path: "/SmileSurface", component: SmileSurface, },
      { path: "/IVDiff", component: IVDiff, },
      { path: "/IVATM", component: IVATM, },
      { path: "/VerticalSpread", component: VerticalSpread, },
    ]
  },

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})