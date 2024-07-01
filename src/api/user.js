import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data: data
  })
}

export function register(data) {
  console.error(data)
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function modifypassword(data) {
  return request({
    // 这又出现了一个世界未解之谜，这里的url为什么不能是/user/modifyPassword?
    // 不加/就会报错
    url: '/user/modifyPassword/',
    method: 'post',
    data: data
  })
}

// export function modifyphone(stunumber, phone) {
//   return request({
//     url: '/user/modifyphone',
//     method: 'post',
//     params: { stunumber, phone }
//   })
// }

export function validateEmail(email) {
  console.error({ email })
  return request({
    url: '/user/validateEmail',
    method: 'post',
    params: { email }
  })
}

export function getProfile(stunumber) {
  return request({
    url: '/user/profile',
    method: 'post',
    params: { stunumber }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info/',
    method: 'get',
    params: { token } // name=xx&xxx=xxx
  })
}

export function logout() {
  return request({
    url: '/user/logout/',
    method: 'post'
  })
}

export function getBriefInfo() {
  // console.log('!!!')
  return request({
    url: '/crawl/brief/',
    method: 'get'
  })
}

export function getDetailInfo(source) {
  return request({
    url: '/crawl/detail/',
    method: 'get',
    params: {
      source: source
    }
  })
}

export function getAllUser(){
  return request({
    url: '/user/getAllUser/',
    method: 'get'
  })
}

export function deleteUser(data)
{
  return request({
    url: '/user/deleteUser/',
    method: 'post',
    data: data//不应该用params,那样会在url上加
  })
}

export function updateUser(data){
  return request({
    url: '/user/updateUser/',
    method: 'post',
    data: data
  })
}

export function changeAdmin(data){
  return request({
    url: '/user/changeAdmin/',
    method: 'post',
    data: data
  })
}

export function addUser(data){
  return request({
    url: '/user/addUser/',
    method: 'post',
    data: data
  })
}