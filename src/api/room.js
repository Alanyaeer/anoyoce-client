import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl
/**
 * 查询某个用户它的所有房间号
 * @param {} params 
 * @returns 
 */
export const queryRoomUserAdd = (params) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/room/query/roomAdd`,
        params: params
    })
}
export const insertRoom = (params) => {
    return axios({
        method: 'put',
        baseURL: `${baseUrl}/api/room/create/room`,
        params: params
    })
}
/**
 * 查询某个房间号的所有用户
 * @param {} params 
 * @returns 
 */
export const queryRoomUser = (params) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/room/query/user`,
        params: params
    })
}
export const addRoom = (params) => {
    return axios({
        method: 'put',
        baseURL: `${baseUrl}/api/room//join/room`,
        params: params
    })
}
export const queryRoom = (params) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/room/query/roomId`,
        params: params
    })
}