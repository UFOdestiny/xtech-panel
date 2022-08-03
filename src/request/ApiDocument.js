import http from '@/plugins/http2';

export let getContentList = (data) => {
  return http.post('x-tech/event/api/document/getContentList',data)
}

export let getApiList = (data) => {
  return http.post('x-tech/event/api/document/getApiList',data)
}

//进行首个API调用
export let getMarkDown = (data) => {
  return http.get('x-tech/event/api/document/getMarkDown',data)
}
// http://192.168.1.32:8080/x-tech/event/api/document/getMarkDown?content_code=postman

//获取接口信息
export let getApiInfo = (data) => {
  return http.post('x-tech/event/api/document/getApiInfo',data)
}