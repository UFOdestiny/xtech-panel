/*
*电商数据接口
*/
import http from '@/plugins/http';
//电商数据-查询
export let findPlatformOrCategoryByCompany = (data) => {
  return http.get('/api/v1/onlineBusinessNew/findCategoryByCompany',data)
}

//电商数据-一级分类
export let findShoppingCategoryParent = () => {
  return http.get('/api/v1/onlineBusiness/findShoppingCategoryParent')
}
//电商数据-二级分类
export let findShoppingCategorySon = (data) => {
  return http.get('/api/v1/onlineBusinessNew/findShoppingCategory', data)
}

//电商数据-表格数据
export let findBusinessByCategory = (data) => {
  return http.post('/api/v1/onlineBusinessNew/findBusinessByCategory', data)
}

//电商数据-月度销售额及同比增长率
export let findBusinessByCompanyOrBrand = (data) => {
  return http.post('/api/v1/onlineBusinessNew/findBusinessByCompanyOrBrand', data)
}
//电商数据-公司市占率
export let findMarketAccounting = (data) => {
  return http.post('/api/v1/onlineBusinessNew/findMarketAccounting', data)
}
//电商数据-回测
export let onlineBusinessRecall = (data) => {
  return http.post('/api/v1/onlineBusiness/recall', data)
}

//查询用户电商异动设置
export let onlinesettingQuery = (data) => {
  return http.post('/api/v1/onlinesetting/query', data)
}
//保存修改电商异动用户设置
export let onlinesettingSave = (data) => {
  return http.post('/api/v1/onlinesetting/save', data)
}