import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl
export const getLogin = (params) => {
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/user/login`,
        data: params
    })
}

export const register = (parmas) => {
    return axios({
        method: 'put' ,
        baseURL: `${baseUrl}/api/user/register` ,
        data: parmas
    })
}

export const Logout = (params) => {
    return axios({
        method: 'post' ,
        baseURL: `${baseUrl}/api/user/logout` ,
        data: params
    })
}
export const queryUser = (params) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/user/query/userInfo`,
        params: params
    })
}
/*
export const queryAllUser = params => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/uesr/userPage`,
        params: params
    })
}

export const getUserInfo = (params) => {
    return axios({
        method: 'post' ,
        baseURL: `${baseUrl}/api/user/getUserInfo` ,
        data: params
    })
}
*/
