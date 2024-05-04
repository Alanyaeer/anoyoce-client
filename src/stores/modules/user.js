import { defineStore } from "pinia";
import {ref} from 'vue'
import { queryUser } from '@/api/user';
export const useUserInfoStore = defineStore(
    'user-info',
    ()=>{
        const userInfo = ref();
        const setUserInfo = (obj) => {
            userInfo.value = obj
        }
        const getUserInfo = () => {
            return userInfo.value
        }
        const reloadUserInfo = async () => {
            let rep =  await queryUser()
            if(rep.code === 200){
                setUserInfo(rep.data)
            }
        }
        return {userInfo, setUserInfo, getUserInfo, reloadUserInfo}
    }
)