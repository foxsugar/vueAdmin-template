import request from '@/utils/request'

// 查询单个订单
export function constant(method, constantForm) {
  return request({
    url: '/admin/fConstant',
    method: 'get',
    params: {
      constantForm
    }
  })
}

export function update(constantForm) {
  return request({
    url: '/admin/uConstant',
    method: 'post',
    params: {
      'constantForm': constantForm
    }
  })
}


