import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getTrendWordFrequency() {
  return request({
    url: '/user/getTrendWordFrequency/',
    method: 'get',
    params: {}
  });
}


export function getTrendHotspots() {
  return request({
    url: '/user/getTrendHotspots/',
    method: 'get',
    params: {}
  });
}

export function getTrendRanking() {
  return request({
    url: '/user/getTrendRanking/',
    method: 'get',
    params: {}
  });
}