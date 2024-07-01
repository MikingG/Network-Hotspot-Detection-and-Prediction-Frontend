import request from '@/utils/request'

export function getCategories() {
  return request({
    url: '/category/all',
    method: 'get'
  })
}

export function getCategoriesByParentId(parentId) {
  return request({
    url: '/category/get',
    method: 'get',
    params: { parentId }
  })
}
