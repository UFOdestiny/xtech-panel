import { createStore } from 'vuex'
import { daysInterval } from '@/utils/index'
//import { delCookie, getCookie } from '@/utils/cookies.js'
const store = createStore({
    namespaced: true,
    state() {
        return {
            Token: '',
            UserInfo: '',
            TimeType: false,
            Date: daysInterval(3),
            RightGraphType: '',
            Frequence: '',
            QuoteType: '510050.XSHG',
            Contract:'10004405.XSHG',
            IntervalVol:'optargetderivativevol_1h',
            IntervalPrice:'optargetderivativeprice_1h',
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
        
        changeVolInterval(state, Interval) {
            state.IntervalVol = Interval
        },
        changePriceInterval(state, Interval) {
            state.IntervalPrice = Interval
        },
    },
    actions: {

    },
})

export default store