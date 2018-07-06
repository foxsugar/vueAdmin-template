import request from '@/utils/request'
export function fetchAllPlayers(pageSize, curPage) {
  return request({
    url: '/admin/fetchAllPlayers',
    method: 'post',
    params: {
      'pageSize': pageSize,
      'curPage': curPage
    }
  })
}

export function fetchPlayer(uid) {
  return request({
    url: '/admin/fetchPlayer',
    method: 'post',
    params: {
      'userId': uid
    }
  })
}

export function doCharge(uid, val) {
  return request({
    url: '/admin/doCharge',
    method: 'post',
    params: {
      'userId': uid,
      'money': val
    }
  })
}

export function doSearchTime(val1, val2, val3) {
  return request({
    url: '/admin/timeSearch',
    method: 'post',
    params: {
      t1: val1,
      t2: val2,
      curPage: val3
    }
  })
}

export function roleInfo(val) {
  return request({
    url: '/admin/roleInfo',
    method: 'post',
    params: {
      'userId': val
    }
  })
}

export function toAgent(val) {
  return request({
    url: '/admin/toAgent',
    method: 'post',
    params: {
      'userId': val
    }
  })
}
// /toPartner
export function toUser(val) {
  return request({
    url: '/admin/toUser',
    method: 'post',
    params: {
      'userId': val
    }
  })
}

export function toPartner(val) {
  return request({
    url: '/admin/toPartner',
    method: 'post',
    params: {
      'userId': val
    }
  })
}




