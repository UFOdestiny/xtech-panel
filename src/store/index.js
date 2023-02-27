import { createStore } from 'vuex'
//import { delCookie, getCookie } from '@/utils/cookies.js'
const store = createStore({
    namespaced: true,
    state() {
        return {
            Token: '',
            UserInfo: '',
            TimeType: false,
            Date: '',
            RightGraphType: '',
            Frequence: '',
            QuoteType: '510050.XSHG',
            Contract:'10004405.XSHG',
            Interval:'optargetderivativevol_1d',
        }
    },
    mutations: {
        // 修改token，并将token存入localStorage
        setToken(state, token) {
            state.Token = token;
            localStorage.setItem('Token', token);
        },
        //删除token
        deltoken(state) {
            state.Token = "";
            localStorage.removeItem("Token");
        },

        //用户信息
        setUserInfo(state, info) {
            state.UserInfo = info
        },
        //右图
        changeRightGraphType(state, RightGraphType) {
            state.RightGraphType = RightGraphType
        },
        //时间
        changeDate(state, Date) {
            state.Date = Date
        },
        //实时
        changeTimeType(state, TimeType) {
            state.TimeType = TimeType
        },
        //频率
        changeFrequence(state, Frequence) {
            state.Frequence = Frequence
        },
        //种类
        changeQuoteType(state, QuoteType) {
            state.QuoteType = QuoteType
        },

        changeContract(state, Contract) {
            state.Contract = Contract
        },
        
        changeInterval(state, Interval) {
            state.Interval = Interval
        },
    },
    actions: {

    },
})

export default store