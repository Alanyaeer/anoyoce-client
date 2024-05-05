import { defineStore } from "pinia";
import {ref} from 'vue'
import { queryUser } from '@/api/user';
export const useUserInfoStore = defineStore(
    'user-info',
    ()=>{
        const userInfo = ref();
        const laodingStatus = ref(true)
        const setUserInfo = (obj) => {
            userInfo.value = obj
        }
        const getUserInfo = () => {
            return userInfo.value
        }
        /**
         * 这个
         * 1 代表上线， 0代表下线 
         */
        const changeUserOnlineStatus = (onlineStatus) => {
            userInfo.value.online = onlineStatus
        }
        const reloadUserInfo = async () => {
            laodingStatus.value = true
            let rep =  await queryUser()
            if(rep.code === 200){
                setUserInfo(rep.data)
                laodingStatus.value = false
            }
        }
        return {userInfo, setUserInfo, getUserInfo, reloadUserInfo, changeUserOnlineStatus, laodingStatus}
    }
)