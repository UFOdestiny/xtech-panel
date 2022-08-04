//用户基本权限
//import store from "../store"
//用户信息
import http from '@/plugins/http';
//import { getCookie } from '@/utils/cookies.js';
//查询所有菜单
export let findAllMemu = () => {
  return http.get('/api/v1/system/memu/findAllMemu')
}
//用户信息
export let userInfo = () => {
  return http.get('/system/info')
}
//退出
export let userLogout = () => {
  return http.post('/system/logout')
}
//菜单
export let userMenu = () => {
  return http.get("/system/menu")
}

//获取管理用户分页列表
export let userPageLimit = (page,limit) => {
  return http.get("/api/v1/system/user/"+page+'/'+limit)
}
// 根据用户分配角色
export let userDoAssign = () => {
  return http.post('/api/v1/system/user/doAssign')
}
//根据用户获取角色数据
export let userToAssign = (userId) => {
  return http.get("/api/v1/system/user/toAssign/"/userId)
}

//新增管理用户
export let userSave = (data) => {
  return http.post('/api/v1/system/user/save',data)
}

// 根据id列表删除管理用户
export let userRemove = (data) => {
  return http.delete('/api/v1/system/user/remove/'+data)
}


//修改管理用户
export let userUpdate = (data) => {
  return http.put('/api/v1/system/user/update',data)
}

//禁用管理用户 
export let userBan = (data) => {
  return http.get('/api/v1/system/user/ban/'+data)
}

//生成微信扫描二维码
// export let wxLogin = (data) => {
//   return http.get('/api/ucenter/system/wx/login')
// }


//校验ODS账号是否存在
export let getImageVerifyCode = () => {
  return http.post('/api/v1/system/getImageVerifyCode')
}
//校验验证是否匹配
export let verifyImageVerifyCode = (data) => {
  return http.post('/api/v1/system/verifyImageVerifyCode',data,{
    params:data
  })
}

export let selectToken = (data) => {
  return http.get('/system/selectToken',data)
}