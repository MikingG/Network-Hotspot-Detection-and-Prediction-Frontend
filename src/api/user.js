import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data,
  })
}

export function modifypassword(stunumber,password) {
  return request({
      url: '/user/profile',
      method: 'post',
      params: {stunumber,password}
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token } // name=xx&xxx=xxx
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
