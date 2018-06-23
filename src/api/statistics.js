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

