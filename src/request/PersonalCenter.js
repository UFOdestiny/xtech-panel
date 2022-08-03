/*个人中心*/
import http from '@/plugins/http';
//查询用户Api相关数据
export let selectApiToken = (data) => {
  return http.get('/api/v1/personal/selectApiToken/',data)
}
//获取用户登录日志
export let LoginLogList = (data) => {
  return http.get('/api/v1/personal/getLoginLogList',data)
}

//获取用户Api相关数据
export let getApiToken = (data) => {
  return http.post('/api/v1/personal/getApiToken',data,{
    params:data,
    responseType: 'blob',
  })
}