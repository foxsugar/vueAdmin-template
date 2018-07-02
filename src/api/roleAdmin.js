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

// export function doTimeSearch(val1, val2, val3) {
//   return request({
//     url: '/admin/timeSearch',
//     method: 'post',
//     params: {
//       't1': val2,
//       't2': val3,
//       'curPage': val1
//     }
//   })
// }



