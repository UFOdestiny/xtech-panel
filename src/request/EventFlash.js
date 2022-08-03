/*
*事件快讯接口
*/
import http from '@/plugins/http';
//事件快讯-标签
export let eventNewstags = () => {
  return http.get('/api/v1/eventNews/tags')
}
//事件快讯-新闻列表
export let eventNews = (data) => {
  return http.post('/api/v1/eventNews', data)
}
//股票k线图数据
export let findDetailsByStockCode = (data) => {
  return http.post('/api/v1/eventNews/findDetailsByStockCode', data)
}
//事件快讯
export let eventNewsSelf = (data) => {
  return http.post('/api/v1/homePage/eventNewsSelf',data)
}