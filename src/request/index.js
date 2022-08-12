import http from '@/plugins/http';
// 事件回测
//新闻详情
// export let getNew = (data) => {
//   return http.post('/events/event-factor', data)
// }
//首页k线图
// export let dailyKline = (data) => {
//   // return http.post('/assets/daily-kline', data) 
//   return http.post('/assets/kline', data)
// }

//首页k线图 获取标的其他相关因子
export let marketDailyFactors = (data) => {
  return http.post('/assets/market-daily-factors', data)
}
// 事件回测标签
export let getLable = (data) => {
  return http.post('/events/tags', data)
};

// 首页  //所有数据
export let getEvent = (data) => {
  return http.post('/events/event-factors', data)
}

//获取验证码
export let userRegister = (data) => {
  return http.post('/user/register', data)
}

// =========zhangkun接口========
// 用户注册
export let register = (data) => {
  return http.post('/api/v1/system/register', data)
}
//用户登陆
export let userLogin = (data) => {
  return http.post('/user/login', data)
}
//查询用户信息
export let getMemberInfo = () => {
  return http.get('/api/v1/system/getMemberInfo')
}
//保存事件库
export let eventlibSave = (data) => {
  return http.post('/api/v1/eventlib/save', data)
}

//test 
export let getTestData = (data) => {
  return http.post('/targetquote/price', data)
}