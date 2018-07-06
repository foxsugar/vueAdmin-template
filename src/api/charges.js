import request from '@/utils/request'

// 查询所有订单
export function findCharges(val) {
  return request({
    url: '/admin/findCharges',
    method: 'post',
    params: {
      'curPage': val
    }
  })
}
// 查询单个订单
export function findCharge(val) {
  return request({
    url: '/admin/uFindCharge',
    method: 'post',
    params: {
      'userId': val
    }
  })
}
// 查询某个时间段订单
export function chargeTimeSearch(time, curPage) {
  return request({
    url: '/admin/chargeTimeSearch',
    method: 'post',
    params: {
      'curPage': curPage,
      "time": time
    }
  })
}
