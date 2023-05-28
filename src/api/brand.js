import request from '@/utils/request'

export function getBrands(pageNum) {
    return request({
        url: '/brand/all',
        method: 'get',
        params: { pageNum }
    })
}

export function getBrandById(id) {
    return request({
        url: '/brand/get',
        method: 'get',
        params: { id }
    })
}

export function addBrand(form) {
    // 默认取得了三级分类中的每个分类的id，只需传最后一级的id即可
    form.categoryId = form.categoryId[2]
    return request({
        url: '/brand/add',
        method: 'post',
        params: form
    })
}

export function editBrand(form) {
    form.categoryId = form.categoryId[2]
    return request({
        url: '/brand/edit',
        method: 'post',
        params: form
    })
}