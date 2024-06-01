import request from '@/utils/request'

// 查询档案上下架记录列表
export function listDanganshangxiajia(query) {
  return request({
    url: '/archives/record/danganshangxiajia/list',
    method: 'get',
    params: query
  })
}

// 查询档案上下架记录详细
export function getDanganshangxiajia(id) {
  return request({
    url: '/archives/record/danganshangxiajia/' + id,
    method: 'get'
  })
}

// 删除档案上下架记录
export function delDanganshangxiajia(id) {
  return request({
    url: '/archives/record/danganshangxiajia/' + id,
    method: 'delete'
  })
}
