/*基础信息管理*/
import http from '@/plugins/http';
// ========股票从属关系======
//获取树状关系图
// export let getStockUpDownLevels = () => {
//   return http.get('/api/v1/base/getStockUpDownLevels')
// }
//获取树状关系图第一级数据
export let getLeadingLevels = () => {
  return http.get('/api/v1/base/getLeadingLevels')
}
//根据pid下级获取数据
// export let getLevelsByPid = (data) => {
//   return http.get('/api/v1/base/getLevelsByPid', data)
// }

// 获取树状关系图查询表格信息
// export let getStockListByLevelId = (data) => {
//   return http.post('/api/v1/base/getStockListByLevelId', data)
// }

// 根据Id删除类别(递归删除自己下面所有的类别包括所有板块多对应的股票信息)
// export let deleteChildById = (data) => {
//   return http.delete('/api/v1/base/deleteChildById', data)
// }
//添加行业
// export let saveLevelAndStocks = (data) => {
//   return http.post('/api/v1/base/saveLevelAndStocks', data)
// }
// 添加类别/板块
// export let saveStockUpdownLevel = (data) => {
//   return http.post('/api/v1/base/saveStockUpdownLevel', data)
// }
//删除股票信息 
export let deleteById = (data) => {
  return http.delete('/api/v1/base/deleteById', data)
}
//  根据输入内容模糊查询获取数据数据
export let queryTreeLevelsByName = (data) => {
  return http.get('/api/v1/base/queryTreeLevelsByName', data)
}

/*=====板块成分======*/
//获取所有板块成分板块信息
// export let getStockTemplateList = (data) => {
//   return http.get('/api/v1/base/getStockTemplateList', data)
// }

// //添加板块标签信息
// export let savePlateTagRelation = (data) => {
//   return http.post('/api/v1/base/savePlateTagRelation', data)
// }
//  新增板块成分股信息
export let saveStockTemplate = (data) => {
  return http.post('/api/v1/base/saveStockTemplate ', data)
}
//删除成分股
export let removeStockById = (data) => {
  return http.delete('/api/v1/base/removeStockById', data)
}

//修改板块信息  
export let updateStockTemplate = (data) => {
  return http.post('/api/v1/base/updateStockTemplate ', data)
}

/*商品属性*/
// 修改板块标签信息
// export let updatePlateTagRelation = (data) => {
//   return http.post('/api/v1/base/updatePlateTagRelation ', data)
// }

/*商品上下游*/
//获取导航数据
export let getUpdownRoutingList = () => {
  return http.get('/api/v1/base/getUpdownRoutingList')
}

//根据productParent查找数据
export let getUpDownByProductParent = (data) => {
  return http.get('/api/v1/base/getUpDownByProductParent', data)
}

//添加数据
export let saveUpdown = (data) => {
  return http.post('/api/v1/base/saveUpdown ', data)
}
//  删除数据
export let removeUpdownById = (data) => {
  return http.delete('/api/v1/base/removeUpdownById', data)
}
//  根据商品删除所有对应的上下游数据
export let removeByProductParentName = (data) => {
  return http.delete('/api/v1/base/removeByProductParentName', data,)
}
/*商品属性*/
// 获取分页列表
export let plateTagRelation = (data) => {
  return http.get('/api/v1/base/plateTagRelation', data)
}

// //添加板块标签信息
// export let savePlateTagRelation = (data) => {
//   return http.post('/api/v1/base/savePlateTagRelation',data)
// } 

//修改板块标签信息
export let updatePlateTagRelation = (data) => {
  return http.post('/api/v1/base/updatePlateTagRelation', data)
}


//删除数据
export let removePlateTagRelationById = (data) => {
  return http.delete('/api/v1/base/removePlateTagRelationById', data)
}

//批量删除数据
export let removePlateTagRelationByIds = (data) => {
  return http.post('/api/v1/base/removePlateTagRelationByIds', data)
}





// ====行业从属关系 伟杰 ====
//查询树状图及子行业
export let querybypcode = (data) => {
  return http.post('/api/v1/base/industry/querybypcode', data)
}

//根据行业代码查询关联的股票信息
export let querybyindustry = (data) => {
  return http.post('/api/v1/base/stock/querybyindustry', data)
}

//查询子级行业信息
export let getChildLevelsByPid = (data) => {
  return http.get('/api/v1/base/getChildLevelsByPid', data)
}

//新增行业信息
export let industrySave = (data) => {
  return http.post('/api/v1/base/industry/save', data)
}
//删除行业信息
export let industryDelete = (data) => {
  return http.post('/api/v1/base/industry/delete', data)
}
//行业模糊查询
export let industryQuerybyname = (data) => {
  return http.post('/api/v1/base/industry/querybyname', data)
}
//行业板块更换
export let industryUpdate = (data) => {
  return http.post('/api/v1/base/industry/update', data)
}


//根据行业代码查询板块信息
export let plateQuerybyindustry = (data) => {
  return http.post('/api/v1/base/plate/querybyindustry', data)
}


//保存板块和与行业的关联信息
export let saveindustryplate = (data) => {
  return http.post('/api/v1/base/plate/saveindustryplate', data)
}

// ===板块配置===
//查询板块信息列表模糊查询
export let plateQuerybyname = (data) => {
  return http.post('/api/v1/base/plate/querybyname', data)
}
//根据板块代码查询关联的股票信息
export let querybyplate = (data) => {
  return http.post('/api/v1/base/stock/querybyplate', data)
}
//获取板块季度信息
export let plateSeasons = (data) => {
  return http.post('/api/v1/base/plate/seasons', data)
}
//修改板块成分股
export let stockUpdate = (data) => {
  return http.post('/api/v1/base/plate/stock/update', data)
}
//添加板块信息
export let plateSave = (data) => {
  return http.post('/api/v1/base/plate/save', data)
}
//添加板块成分股
export let plateStockSave = (data) => {
  return http.post('/api/v1/base/plate/stock/save', data)
}
//删除板块信息
export let plateDelete = (data) => {
  return http.post('/api/v1/base/plate/delete', data)
}

//修改板块基本信息
export let plateUpdate = (data) => {
  return http.post('/api/v1/base/plate/update', data)
}

//根据成分股代码和板块代码修改关联关系信息
export let updatebycode = (data) => {
  return http.post('/api/v1/base/plate/relation/updatebycode', data)
}
//删除成分股股票
export let deletebycode = (data) => {
  return http.post('/api/v1/base/plate/relation/deletebycode', data)
}
//根据关系id删除关联关系
export let deletebyid = (data) => {
  return http.post('/api/v1/base/plate/relation/deletebyid', data)
}

//获取股票列表
export let stockQueryall = (data) => {
  return http.post('/api/v1/base/stock/queryall', data)
}

//板块成分股导出
export let stockExport = (data) => {
  return http.get('/api/v1/base/stock/export', data)
}

//板块成分股导入
export let stockImport = (data) => {
  return http.post('/api/v1/base/stock/import', data)
}

//板块基本信息导出
export let plateExport = (data) => {
  return http.get('/api/v1/base/plate/export', data)
}

//板块基本信息导入
export let plateImport = (data) => {
  return http.post('/api/v1/base/plate/import', data)
}

/**
 * 商品配置
 * */

//分页查询商品列表
export let querypagelike = (data) => {
  return http.post('/api/v1/base/production/querypagelike', data)
}
//获取商品类型
export let typeQuerybypcode = (data) => {
  return http.post('/api/v1/base/production/type/querybypcode', data)
}
//添加商品
export let productionSave = (data) => {
  return http.post('/api/v1/base/production/save', data)
}
//根据商品代码批量删除
export let productionDeletes = (data) => {
  return http.post('/api/v1/base/production/deletes', data)
}
//根据商品代码单条删除
export let productionDelete = (data) => {
  return http.post('/api/v1/base/production/delete', data)
}
//根据商品代码修改商品
export let productionUpdatebycode = (data) => {
  return http.post('/api/v1/base/production/updatebycode', data)
}

//根据商品ID修改商品
export let productionUpdatebyid = (data) => {
  return http.post('/api/v1/base/production/updatebyid', data)
}

//商品基本信息导入
export let productionImport = (data) => {
  return http.post('/api/v1/base/production/import', data)
}

//商品导入模板
export let productionTemplate = (data) => {
  return http.get('api/v1/base/production/export/template', data)
}

/**
 * 商品上下游关系api
 */
//根据商品代码获取关联商品列表
export let updownQuerybycode = (data) => {
  return http.post('/api/v1/base/production/updown/querybycode', data)
}
//添加商品关联关系
export let updownSave = (data) => {
  return http.post('/api/v1/base/production/updown/save', data)
}
//根据商品代码和关联商品代码删除关联关系
export let updownDeletebycode = (data) => {
  return http.post('/api/v1/base/production/updown/deletebycode', data)
}

//根据商品代码和关联商品代码修改关联关系信息
export let updownUpdatebycode = (data) => {
  return http.post('/api/v1/base/production/updown/updatebycode', data)
}

//查询商品基础信息列表
export let querybaselike = (data) => {
  return http.post('/api/v1/base/production/querybaselike', data)
}
//商品上下游导入
export let updownImport = (data) => {
  return http.post('/api/v1/base/production/updown/import', data)
}
