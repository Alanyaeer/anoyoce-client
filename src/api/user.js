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
// 写一个注册的 ， 可以参考我哪个 oj 的 client 