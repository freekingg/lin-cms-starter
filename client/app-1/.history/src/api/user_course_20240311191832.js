import request from '@/utils/request'


// 登录方法
export function addUserCourse(data) {
  return request({
    url: '/user_course/',
    method: 'post',
    data: data
  })
}

export function listUserAll() {
  return request({
    url: '/user_course/listAll',
    method: 'get',

  })
}

export function delUserCourse(id) {
  return request({
    url: '/user_course/'+id,
    method: 'delete',

  })
}

export function getUserCourse(id) {
  return request({
    url: '/user_course/'+id,
    method: 'get',

  })
}

export function updateUserCourse(data) {
  return request({
    url: '/user_course/'+data.id,
    method: 'put',
    data:data
  })
}


//增加  1
//删除  1
//修改  1
//查询  1