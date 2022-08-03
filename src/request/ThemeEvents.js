import http from '@/plugins/http';

//=====主题事件-涨价追踪====

//主题事件-涨价追踪-查询用户涨价追踪设置
export let priceTrackQuery = (data) => {
  return http.post('/api/v1/usersetting/priceTrack/query', data)
}
//主题事件-涨价追踪-保存修改涨价追踪用户设置  
export let priceTrackSave = (data) => {
  return http.post('/api/v1/usersetting/priceTrack/save', data)
}
//主题事件-涨价追踪-实时推荐-获取现货商品类型-新接口
export let productionCashtype = (data) => {
  return http.get('/api/v1/base/production/cashtype', data)
}

//获取非现货商品类型
export let productionNotcashtype = (data) => {
  return http.get('/api/v1/base/production/notcashtype', data)
}
 //获取商品上下级列表
export let productionUpDown = (data) => {
  return http.post('/api/v1/productionUpDown', data)
}

//获取商品关联股票信息
export let productionStock = (data) => {
  return http.post('/api/v1/productionStock', data)
}

// ====主题事件-股价联动=====
 //查询用户股价联动设置
export let linkageQuery = (data) => {
  return http.post('/api/v1/usersetting/linkage/query', data)
}
//保存修改股价联动设置
export let linkageSave= (data) => {
  return http.post('/api/v1/usersetting/linkage/save', data)
}

// ====电商数据异动列表====
//电商数据-异动事件列表
export let eventlist= (data) => {
  return http.post('/api/v1/onlineBusiness/eventlist', data)
}
