import request from '@/utils/request'

export function fetchPartners(val) {
  return request({
    url: '/admin/fetchPartners',
    method: 'post',
    params: {
      'curPage': val
    }
  })
}

export function fetchPartner(val) {
  return request({
    url: '/admin/fetchPartner',
    method: 'post',
    params: {
      'userId': val
    }
  })
}
