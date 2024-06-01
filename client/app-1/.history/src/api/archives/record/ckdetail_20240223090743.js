import request from '@/utils/request'

// 查询出库明细列表
export function listCkdetail(query) {
  return request({
    url: '/archives/record/ckdetail/list',
    method: 'get',
    params: query
  })
}

export function queryUnCkDetailPageList(data) {
  return request({
    url: '/archives/pad/ck/queryUnCkDetailPageList',
    method: 'post',
    data: data
  })
}


// 查询出库明细详细
export function getCkdetail(id) {
  return request({
    url: '/archives/record/ckdetail/' + id,
    method: 'get'
  })
}

// 新增出库明细
export function addCkdetail(data) {
  return request({
    url: '/archives/record/ckdetail',
    method: 'post',
    data: data
  })
}

// 修改出库明细
export function updateCkdetail(data) {
  return request({
    url: '/archives/record/ckdetail',
    method: 'put',
    data: data
  })
}

// 删除出库明细
export function delCkdetail(id) {
  return request({
    url: '/archives/record/ckdetail/' + id,
    method: 'delete'
  })
}


