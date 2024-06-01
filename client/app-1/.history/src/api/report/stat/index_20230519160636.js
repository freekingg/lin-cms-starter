import request from '@/utils/request'

// 查询消杀管理列表
export function listDisinfect(query) {
  return request({
    url: '/report/environment/disinfect/list',
    method: 'get',
    params: query
  })
}

// 查询消杀管理详细
export function getDisinfect(id) {
  return request({
    url: '/report/environment/disinfect/' + id,
    method: 'get'
  })
}

// 新增消杀管理
export function addDisinfect(data) {
  return request({
    url: '/report/environment/disinfect',
    method: 'post',
    data: data
  })
}

// 修改消杀管理
export function updateDisinfect(data) {
  return request({
    url: '/report/environment/disinfect',
    method: 'put',
    data: data
  })
}

// 删除消杀管理
export function delDisinfect(id) {
  return request({
    url: '/report/environment/disinfect/' + id,
    method: 'delete'
  })
}
