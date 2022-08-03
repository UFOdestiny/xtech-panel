/*因子看板*/
import http from '@/plugins/http'

export let factorList = () => {
  return http.get('/api/v1/factorList')
}
export let factortest = () => {
  return http.get('/api/v1/factor/sortlist')
}
//根据因子获取分组详情
export let findGroupByFactor = (data) => {
  return http.get('/api/v1/findGroupByFactor', data)
}

//查询ic值
export let findICByFactor = (data) => {
  return http.get('/api/v1/findICByFactor', data)
}
// 根据因子前后20名的股票
export let findStockByFactor = (data) => {
  return http.get('/api/v1/findStockByFactor', data)
}

