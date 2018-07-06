import request from '@/utils/request'

export function onlineInfo(date) {
  return request({
    url: '/admin/onlineInfo',
    method: 'post',
    params: {
      date
    }
  })
}


export function getLogByDates(num) {
  return request({
    url: '/admin/getLogByDates',
    method: 'post',
    params: {
      num
    }
  })
}
