/**管理员 、超级管理员页面 */
import http from '@/plugins/http';
//导入excel
export let importExcelForType = (data) => {
  return http.post('/api/v1/base/importExcelForType', data)
}
// 超级管理员页面接口
// 查询已提交的记录
export let baseFindLogs = (data) => {
  return http.get('/api/v1/base/findLogs/' + data)
}
//审核未通过
export let baseRefuse = (data) => {
  return http.get('/api/v1/base/refuse/' + data)
}
// 删除数据
export let baseRemove = (data) => {
  return http.post('/api/v1/base/remove', data)
}

// 获取用户登录日志分页列表
export let  getLoginLogList=(data)=>{
  return http.get('/api/v1/base/getLoginLogList',data)
}