import request from '@/utils/request'

export function delegateRel(val) {
  return request({
    url: '/admin/downward',
    method: 'post',
    params: {
      "agentId" : val
    }
  })
}
