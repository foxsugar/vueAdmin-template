import request from '@/utils/request'

// 查询所有订单
export function changePassword(val) {
  return request({
    url: '/admin/changePwd',
    method: 'post',
    params: {
      'pwd': val
    }
  })
}
