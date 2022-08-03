// 分配角色菜单权限
import http from '@/plugins/http';
//查询所有菜单
export let findAllMemu = () => {
  return http.get('/api/v1/system/memu/findAllMemu')
}
//修改菜单
export let updateMemu = (data) => {
  return http.put('/api/v1/system/memu/update', data)
}
//新增菜单
export let saveMemu = (data) => {
  return http.post('/api/v1/system/memu/save', data)
}

//递归删除菜单
export let removeMemu = (data) => {
  return http.delete('/api/v1/system/memu/remove/'+data,)
}
/*======角色API=======*/
//   获取角色分页列表
export let rolePageLimit = (page, limit) => {
  return http.get("/api/v1/system/role/" + page + '/' + limit)
}

//新增角色
export let roleSave = (data) => {
  return http.post('/api/v1/system/role/save', data)
}
//删除角色
export let roleRemove = (data) => {
  return http.get('/api/v1/system/role/remove/'+data)
}

// 修改角色
export let roleUpdate= (data) => {
  return http.put('/api/v1/system/role/update',data)
}
//根据角色获取菜单
export let roleMemu = (roleId) => {
  return http.get("/api/v1/system/memu/toAssign/"+roleId)
}
export let  userRole= (roleId) => {
  return http.get("/api/v1/system/memu/toAssign2/"+roleId)
}
//获取管理用户分页列表
// export let rolePageLimit = (page,limit) => {
//   return http.get("/api/v1/system/user/"+page+'/'+limit)
// }