import request from '@/utils/request'
// import axios from 'axios'

// export function getEventList() {
//   return axios.get('http://127.0.0.1:5000/geteventlist')
// }

export function getEventList() {
  return request({
    url: '/user/geteventlist/',
    method: 'get'
  })
}

export function getEventDetail(eventId) {
  return request({
    url: '/api/event/detail',
    method: 'get',
    params: { eventId }
  })
}
