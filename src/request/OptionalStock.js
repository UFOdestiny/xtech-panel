/*
*自选股页面接口
*/
import http from '@/plugins/http';
//添加
export let saveMylfStock = (data) => {
    return http.post('/api/v1/myselfStock/saveMylfStock', data)
}
//查询
export let findMyselfStockById = (data) => {
    return http.get('/api/v1/myselfStock/findMyselfStockById', data)
}
// 删除
export let removeMylfStockByIds = (data) => {
    return http.post('/api/v1/myselfStock/removeMylfStockByIds', data)
}
//公告板块
export let findAnnouncement = (data) => {
    return http.post('/api/v1/myselfStock/findAnnouncement', data)
}
// 重要板块
export let findImportant = (data) => {
    return http.post('/api/v1/myselfStock/findImportant', data)
}
/// 研报板块
export let findJournalialNewspaper = (data) => {
    return http.post('/api/v1/myselfStock/findJournalialNewspaper', data)
}
// 资讯板块
export let findNews = (data) => {
    return http.post('/api/v1/myselfStock/findNews', data)
}
//修改添加备注
export let updateNote = (data) => {
    return http.post('/api/v1/myselfStock/updateNote', data)
}
//查找分组
export let getGroupByUserId = (data) => {
    return http.get('/api/v1/myselfGroup/getGroupByUserId', data)
}
//添加分组 
export let addGrouping = (data) => {
    return http.post('/api/v1/myselfGroup/add', data)
}
//修改分组名
export let updateGrouping = (data) => {
    return http.post('/api/v1/myselfGroup/update', data)
} 
//删除分组
export let removeGrouping = (data) => {
    return http.get('/api/v1/myselfGroup/remove', data)
} 
// 获取股票申万三级行业及概念行业信息
export let myselfStockIndustry = (data) => {
    return http.get('/api/v1/myselfStock/industry', data)
} 