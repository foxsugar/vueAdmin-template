import request from '@/utils/request'

export function fetchDelegates(val) {
  return request({
    url: '/admin/fetchDelegates',
    method: 'post',
    params: {
      'curPage': val
    }
  })
}

export function fetchDelegate(val) {
  return request({
    url: '/admin/fetchDelegate',
    method: 'post',
    params: {
      'userId': val
    }
  })
}


