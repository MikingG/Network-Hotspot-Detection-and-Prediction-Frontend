import request from '@/utils/request'

export function getGroups() {
    return request({
        url: '/group/all',
        method: 'get',
        params: { }
    })
}

export function getApplications(stunumber) {
    return request({
        url: '/application/myapps',
        method: 'post',
        params: {stunumber}
    })
}

export function postform(form) {
    return request({
        url: '/application/submit',
        method: 'post',
        data: form
    })
}