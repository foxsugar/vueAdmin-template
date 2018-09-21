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


export function dissolveRoomByUserId(val) {
  return request({
    url: '/admin/dissolveRoomByUserId',
    method: 'post',
    params: {
      'userId': val
    }
  })
}
