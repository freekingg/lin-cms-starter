import request from '@/utils/request'


// 登录方法
export function list(data) {
  return request({
    url: '/test',
    method: 'post',
    data:data
  })
}
