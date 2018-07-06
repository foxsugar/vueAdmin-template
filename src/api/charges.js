import request from '@/utils/request'

export function findCharges(val) {
  return request({
    url: '/admin/findCharges',
    method: 'post',
    params: {
      'curPage': val
    }
  })
}
