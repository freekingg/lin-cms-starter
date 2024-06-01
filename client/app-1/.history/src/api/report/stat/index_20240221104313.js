import request from '@/utils/request'


export function allLightOpen() {
  return request({
    url: '/report/stat/gatewayData/allLightOpen',
    method: 'get',

  })
}
//allLightClose
export function allLightClose() {
  return request({
    url: '/report/stat/gatewayData/allLightClose',
    method: 'get',

  })
}
//allMjjWind
export function allMjjWind() {
  return request({
    url: '/report/stat/gatewayData/allMjjWind',
    method: 'get',

  })
}

//allMjjReset
export function allMjjReset() {
  return request({
    url: '/report/stat/gatewayData/allMjjReset',
    method: 'get',

  })
}

//allMjjReset
export function allMjjLock() {
  return request({
    url: '/report/stat/gatewayData/allMjjLock',
    method: 'get',

  })
}

//allMjjUnLock
export function allMjjUnLock() {
  return request({
    url: '/report/stat/gatewayData/allMjjUnLock',
    method: 'get',

  })
}

