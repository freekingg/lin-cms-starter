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

// stat/gatewayData/area/getAllGroup

//getAllGroup
export function getAllGroup() {
  return request({
    url: '/report/stat/gatewayData/area/getAllGroup',
    method: 'get',

  })
}

/** http://192.168.0.45:8088/report/stat/gatewayData/mjjWind/25
http://192.168.0.45:8088/report/stat/gatewayData/mjjReset/25
http://192.168.0.45:8088/report/stat/gatewayData/mjjLock/25
http://192.168.0.45:8088/report/stat/gatewayData/mjjUnLock/25 **/
//mjjWind
export function mjjWind(id) {
  return request({
    url: '/report/stat/gatewayData/mjjWind/'+id,
    method: 'get',

  })
}

//mjjReset
export function mjjReset(id) {
  return request({
    url: '/report/stat/gatewayData/mjjReset/'+id,
    method: 'get',

  })
}

//mjjLock
export function mjjLock(id) {
  return request({
    url: '/report/stat/gatewayData/mjjLock/'+id,
    method: 'get',

  })
}

//mjjUnLock
export function mjjUnLock(id) {
  return request({
    url: '/report/stat/gatewayData/mjjUnLock/'+id,
    method: 'get',

  })
}

///archives/pad/ck/queryUnCkDetailCount/{ areaId}
export function queryUnCkDetailCount(areaId) {
  return request({
    url: '/archives/pad/ck/queryUnCkDetailCount/'+areaId,
    method: 'post',

  })
}

///archives/pad/ck/queryUnCkDetailPageList
export function queryUnCkDetailPageList(data) {
  return request({
    url: '/archives/pad/ck/queryUnCkDetailPageList',
    method: 'post',
    data
  })
}

//statAllDeviceCountByAreaId
export function statAllDeviceCountByAreaId(areaId) {
  return request({
    url: '/report/stat/gatewayData/statAllDeviceCountByAreaId/'+areaId,
    method: 'get',

  })
}



///
export function oneKeyPatrolInspection(areaId) {
  return request({
    url: '/report/storeroom/inspection/oneKeyPatrolInspection/'+areaId,
    method: 'post',

  })
}

export function allSettingTH(data) {
  return request({
    url: '/report/stat/gatewayData/kt/allSettingTH',
    method: 'post',
    data:data,

  })
}


//queryStorageGroupListInfoByAreaId
export function queryStorageGroupListInfoByAreaId(areaId) {
  return request({
    url: '/report/stat/kf/queryStorageGroupListInfoByAreaId/'+areaId,
    method: 'get',

  })
}
///storehouse/shelves/listByDaPing/{groupId}
export function listByDaPing(groupId) {
  return request({
    url: '/storehouse/shelves/listByDaPing/'+groupId,
    method: 'get',

  })
}