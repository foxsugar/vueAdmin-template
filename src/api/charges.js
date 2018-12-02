import request from '@/utils/request'
import user from '../store/modules/user'

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
export function chargeTimeSearch(time, curPage, chargeFrom, userId, moneyType) {
  return request({
    url: '/admin/chargeTimeSearch',
    method: 'post',
    params: {
      'curPage': curPage,
      'time': time,
      'chargeFrom': chargeFrom,
      'userId': userId,
      'moneyType': moneyType

    }
  })
}

export function incomeTimeSearch(time, curPage, userId) {
  return request({
    url: '/admin/partnerRecord',
    method: 'post',
    params: {
      'curPage': curPage,
      "time": time,
      "userId": userId
    }
  })
}

export function todayIncomeTimeSearch(curPage) {
  return request({
    url: '/admin/todayPartnerRecord',
    method: 'post',
    params: {
      'curPage': curPage
    }
  })
}
