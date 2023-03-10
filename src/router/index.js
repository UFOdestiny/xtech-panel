import { createRouter, createWebHashHistory } from "vue-router"



const login = () => import("@/views/Login/index.vue")
const MainPage = () => import("@/views/MainPage.vue")

const NotionalPrincipal = () => import("@/components/NotionalPrincipal/NotionalPrincipal.vue")
const OpTargetQuote = () => import("@/components/OpTargetQuote/OpTargetQuote.vue")
const OpNominalAmount = () => import("@/components/OpNominalAmount/OpNominalAmount.vue")
const OpContractQuote = () => import("@/components/OpContractQuote/OpContractQuote.vue")
const PutdMinusCalld = () => import("@/components/PutdMinusCalld/PutdMinusCalld.vue")
const OpDiscount = () => import("@/components/OpDiscount/OpDiscount.vue")
const OpTargetDerivativeVol = () => import("@/components/OpTargetDerivativeVol/OpTargetDerivativeVol.vue")
const OpTargetDerivativePrice = () => import("@/components/OpTargetDerivativePrice/OpTargetDerivativePrice.vue")
const CPR = () => import("@/components/CPR/CPR.vue")



const Volatility = () => import("@/components/Volatility/Volatility.vue")

const PremiumDiscount = () => import("@/components/PremiumDiscount/PremiumDiscount.vue")
const Skewness = () => import("@/components/Skewness/Skewness.vue")
const SmileSurface = () => import("@/components/SmileSurface/SmileSurface.vue")
const IVDiff = () => import("@/components/IVDiff/IVDiff.vue")
const IVATM = () => import("@/components/IVATM/IVATM.vue")
const VerticalSpread = () => import("@/components/VerticalSpread/VerticalSpread.vue")

const FormVue = () => import("@/components/Utils/FormVue.vue")
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
      { path: "/OpTargetQuote", component: OpTargetQuote, },
      { path: "/OpNominalAmount", component: OpNominalAmount, },
      { path: "/OpContractQuote", component: OpContractQuote, },
      { path: "/PutdMinusCalld", component: PutdMinusCalld, },
      { path: "/OpDiscount", component: OpDiscount, },
      { path: "/OpTargetDerivativeVol", component: OpTargetDerivativeVol, },
      { path: "/OpTargetDerivativePrice", component: OpTargetDerivativePrice, },
      { path: "/CPR", component: CPR, },


      { path: "/NotionalPrincipal", component: NotionalPrincipal, },
      { path: "/Volatility", component: Volatility, },

      { path: "/PremiumDiscount", component: PremiumDiscount, },
      { path: "/Skewness", component: Skewness, },
      { path: "/SmileSurface", component: SmileSurface, },
      { path: "/IVDiff", component: IVDiff, },
      { path: "/IVATM", component: IVATM, },
      { path: "/VerticalSpread", component: VerticalSpread, },
      
      { path: "/FormVue", component: FormVue, },
    ]
  },

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})