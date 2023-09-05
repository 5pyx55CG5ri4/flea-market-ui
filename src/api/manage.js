import {axios} from '@/utils/request'



export function httpAction(url, parameter, method) {
    return axios({
        url: url,
        method: method,
        data: parameter
    })
}

//post
export function postAction(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: parameter
    })
}

//put
export function putAction(url, parameter) {
    return axios({
        url: url,
        method: 'put',
        data: parameter
    })
}

//get
export function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}

//deleteAction
export function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}

