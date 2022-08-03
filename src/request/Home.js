/*
*首页接口
*/
import http from '@/plugins/http';
// 首页-概念热点
export let homePageHotShop = (data) => {
  return http.get('/api/v1/homePage/hotShop', data)
}
//首页-投资日历
export let homePageCalendar = (data) => {
  return http.get('/api/v1/homePage/calendar', data)
}
//首页-回测看事件
export let homePageIncome = (data) => {
  return http.get('/api/v1/homePage/income', data)
}
//首页-股价看事件
export let homePagePrice = (data) => {
  return http.get('/api/v1/homePage/price', data)
}
//首页-最新机会 
export let homePageChance = (data) => {
  return http.get('/api/v1/homePage/chance', data)
}

//首页-事件跟踪
export let homePageTrack = (data) => {
  return http.get('/api/v1/homePage/track', data)
}
//首页-投资机会 k线图
export let homePageFindEventAndSharePrice = (data) => {
  return http.post('/api/v1/homePage/findEventAndSharePrice', data)
}
//研报热点列表 
export let getlist = (data) => {
  return http.post('/api/v1/research/getlist',data)
}

// 影视异动
export let ChangesMovie = (data) => {
  return http.post('/api/v1/homePage/changes/movie',data)
}

//风险提示TOP5
export let eventstop5 = (data) => {
  return http.post('/api/v1/warning/events/top5',data)
}
//涨价追踪异动
export let changePriceTrack = (data) => {
  return http.post('/api/v1/catchUp/change/priceTrack',data)
}

//股价联动-异动提醒 
export let linkageExtremeRemind = (data) => {
  return http.post('/api/v1/homepage/linkage/extremeRemind',data)
}
//板块异动

export let changesPlate = (data) => {
  return http.post('/api/v1/changes/plate/getUnusual',data)
}

//=== 优选事件策略===

//首页最新优选策略基本信息--新
export let strategyLastday = (data) => {
  return http.get('/api/v1/strategy/info/lastday',data)
}

//首页最新优选策略基本信息
// export let strategyLastday = (data) => {
//   return http.get('/api/v1/strategy/lastday',data)
// }

//首页最新优选策略近3个月净值
export let strategylastthreemonth = (data) => {
  return http.get('/api/v1/strategy/value/lastthreemonth',data)
}

// 详情页优选策略净值信息 首页折线图--新
export let strategyValue = (data) => {
  return http.get('/api/v1/strategy/info/value/first',data)
}

// // // 详情页优选策略净值信息
// export let strategyValue = (data) => {
//   return http.get('/api/v1/strategy/value',data)
// }

//优选策略交易记录分页
// export let strategyRecord = (data) => {
//   return http.get('/api/v1/strategy/trading/record',data)
// }

//优选策略持仓记录分页-新
export let strategyHoldingRecord = (data) => {
  return http.get('/api/v1/strategy/info/holding/record',data)
}

// 优选策略调仓记录分页- 新
export let strategyTradingRecord = (data) => {
  return http.get('/api/v1/strategy/info/trading/record',data)
}

//最新优选策略基本信息单条详情-新
export let strategyDetail = (data) => {
  return http.get('/api/v1/strategy/info/detail',data)
}

//优选策略净值折线图和下方图表
export let strategyChartandform = (data) => {
  return http.get('/api/v1/strategy/info/chartandform',data)
}


// // //最新优选策略基本信息单条详情
// export let strategyDetail = (data) => {
//   return http.get('/api/v1/strategy/detail',data)
// }

/*AI选股*/
//最新优选策略基本信息
export let AIStrategyLastday = (data) => {
  return http.get('/api/v1/AIStrategy/info/lastday',data)
}

//首页最新优选策略净值折线图
export let AIStrategyFirst = (data) => {
  return http.get('/api/v1/AIStrategy/info/value/first',data)
}

//优选策略净值折线图
export let AIStrategyValue = (data) => {
  return http.get('/api/v1/AIStrategy/info/value',data)
}

//最新优选策略基本信息单条详情
export let AIStrategyDetail = (data) => {
  return http.get('/api/v1/AIStrategy/info/detail',data)
}

//优选策略净值折线图和下方图表
export let AIStrategyChartandform = (data) => {
  return http.get('/api/v1/AIStrategy/info/chartandform',data)
}

//优选策略调仓记录分页
export let AIStrategyTradingRecord= (data) => {
  return http.get('/api/v1/AIStrategy/info/trading/record',data)
}

//优选策略持仓记录分页
export let AIStrategyHoldingRecord= (data) => {
  return http.get('/api/v1/AIStrategy/info/holding/record',data)
}
