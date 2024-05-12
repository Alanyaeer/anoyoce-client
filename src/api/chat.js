import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

export const queryChatInfoList = (params) => {
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/chat/query/chatInfoList`,
        params: params
    })
}
/**
 * 这样就可以又携带请求体 又可以携带 请求参数了
 * @param {} params 
 * @param {*} requestBody 
 * @returns 
 */
export const insertAddChatInfo = (params, requestBody) => {
    return axios({
        method: 'put',
        baseURL: `${baseUrl}/api/chat/insert/addChatInfo`,
        params: params,
        data: requestBody
    })
}
export const saveScoreInfo = (params) => {
    return axios({
        method: 'put',
        baseURL: `${baseUrl}/api/chat/save/score`,
        data: params
    })
}
export const queryScoreInfo = (params) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/chat/query/score`,
        params: params
    })
}