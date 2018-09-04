import request from '@/utils/request'

export function dissolveRoom(val) {
  return request({
    url: '/admin/dissolveRoom',
    method: 'post',
    params: {
      'roomId': val
    }
  })
}

