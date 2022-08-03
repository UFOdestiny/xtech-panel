/*
*风险预警接口
*/
import http from '@/plugins/http';
//风险预警-查询新闻信息
export let warningEvents = (data) => {
  return http.post('/api/v1/warning/events', data)
}
//风险预警-标签列表
export let warningTags = () => {
  return http.get('/api/v1/warning/tags')
}