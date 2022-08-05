import router from "@/router/index.js"
//import store from "@/store/index.js"
import { getCookie } from '@/utils/cookies.js'

router.beforeEach((to, from, next) => {
  // !store.state.UserToken
  if (!getCookie('result')) {
    // 未登录  页面是否需要登录
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      next();
    } else {
      next({
        path: "/login"
      })
    }
  }
  // else {
  //   // 用户已经登录  路由的访问权限
  //   if (!store.state.permissionList) {
  //     store.dispatch("FETCH_PERMISSION").then(() => {
  //       next({
  //         path: to.path
  //       })
  //     })
  //   } else {
  //     // store存在权限
  //     if (to.path !== "/login") {
  //       next();
  //     } else {
  //       next(from.fullPath)
  //     }
  //   }
  // }
})