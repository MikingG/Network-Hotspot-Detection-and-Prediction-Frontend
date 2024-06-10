import request from '@/utils/request'

export function getGroups(searchinfo) {
  return request({
    url: '/group/all',
    method: 'get',
    params: { searchinfo }
  })
}

export function getVideo() {
  return request({
    url: '/group/getvideo',
    method: 'get',
    params: { }
  })
}

export function getWeather() {
  return request({
    url: '/getweather',
    method: 'get',
    params: { }
  })
}

export function getTopGroups() {
  console.error('!!!!!')
  return request({
    url: '/group/top',
    method: 'get',
    params: { }
  })
}

export function getCategory() {
  return request({
    url: '/user/getCategory/',
    method: 'get',
    params: {}
  });
}

export function getWordFrequency() {
  return request({
    url: '/user/getWordFrequency/',
    method: 'get',
    params: {}
  });
}


export function getHotspots() {
  return request({
    url: '/user/getHotspots/',
    method: 'get',
    params: { }
  });
}

export function postform(form) {
  return request({
    url: '/application/submit',
    method: 'post',
    data: form
  })
}

export function getAttachmentUrl(groupId) {
  return request({
    url: '/group/getattachment',
    method: 'post',
    params: { id: groupId }
  })
}

