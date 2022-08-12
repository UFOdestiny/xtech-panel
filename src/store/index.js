import { createStore } from 'vuex'
//import { delCookie, getCookie } from '@/utils/cookies.js'
// Create a new store instance.
const store = createStore({
    namespaced: true,
    state() {
        return {
            Token: '',
            UserInfo: '',
            GraphType: '名义本金',
            TimeType: true,
            Date: '',
            RightGraphType: '',



        }
    },
    mutations: {
        // 修改token，并将token存入localStorage
        setToken(state, token) {
            state.Token = token;
            localStorage.setItem('Token', token);
        },

        deltoken(state) {
            state.Token = "";
            localStorage.removeItem("Token");
        },

        //用户信息
        setUserInfo(state, info) {
            state.UserInfo = info
        },

        changeGraphType(state, GraphType) {
            state.GraphType = GraphType
        },

        changeRightGraphType(state, RightGraphType) {
            state.RightGraphType = RightGraphType
        },
        changeDate(state, Date) {
            state.Date = Date
        },

        changeTimeType(state, TimeType) {
            state.TimeType = TimeType
        },
    },
    actions: {
        // async FETCH_PERMISSION({ commit, state }) {
        //     commit('SET_PERMISSION', []);
        //     let permissionList = await userMenu();
        //     userInfo().then((res) => {
        //         setCookie('userPermission', JSON.stringify(res.data.permissionValueList))
        //         commit("USER_INFO", res.data)
        //     })
        //     if (permissionList.code == 200) {
        //         if (permissionList.length == 0) {
        //             router.push({ name: 'login' })
        //         }
        //         // 筛选
        //         let routes = recursionRouter(permissionList, dynamicRouter);
        //         let MainContainer = DynamicRoutes.find(v => v.path === "/");
        //         let children = MainContainer.children;
        //         children.push(...routes)
        //         // 生成菜单
        //         commit("SET_MENU", children);
        //         // 初始化路由
        //         let initialRoutes = router.options.routes;
        //         if (MainContainer !== '') {
        //             // 设置默认路由
        //             setDefaultRoute([MainContainer]);
        //         }
        //         router.addRoutes(DynamicRoutes);
        //         // commit("SET_PERMISSION", [...initialRoutes, ...DynamicRoutes])
        //     } else {
        //         delCookie('result')
        //         delCookie('userid')
        //         delCookie('userPermission')
        //         commit('CLEAR_PERMSSION')
        //         commit('CLEAR_MENU', [])
        //         router.push({ name: 'login' })
        //     }
        // },

        // checkoutToken() {
        //     selectToken({
        //         params: {
        //             id: getCookie('userid'),
        //         },
        //     }).then((res) => {
        //         if (res.code == 200) {
        //             let token = JSON.parse(getCookie('result'))
        //             if (res.data == null) {
        //                 CommonAlert('获取权限失败,请重新登录')
        //                 setTimeout(() => {
        //                     delCookie('result')
        //                     delCookie('userid')
        //                     delCookie('userPermission')
        //                     router.push('/login')

        //                 }, 3000)
        //             } else {
        //                 if (res.data !== token) {
        //                     CommonAlert('您的账号已在另一台设备登录')
        //                     setTimeout(() => {
        //                         delCookie('result')
        //                         delCookie('userid')
        //                         delCookie('userPermission')
        //                         router.push('/login')
        //                     }, 3000)
        //                 }
        //             }
        //         } else {
        //             Message.closeAll()
        //             CommonAlert('获取权限失败,请重新登录')
        //             setTimeout(() => {
        //                 delCookie('result')
        //                 delCookie('userid')
        //                 delCookie('userPermission')
        //                 router.push('/login')
        //             }, 3000)
        //         }
        //     })
        // },

    },
})

export default store