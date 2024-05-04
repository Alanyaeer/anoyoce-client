import { defineStore } from "pinia";
import {ref, watch} from 'vue'
import {queryRoomUserAdd, insertRoom, queryRoomUser}  from '@/api/room'
export const useRoomStore = defineStore(
    'room-info',
    () => {
        const currentRoomIndex = ref(0)
        const roomList = ref([])
        const roomUserList = ref([])
        const setCurrentRoomIndex = (id) => {
            if(id > roomList.value.length){
                window.alert('出现错误')
                return ;
            }
            else currentRoomIndex.value = id
        }
        const getCurrentRoomIndex = () => currentRoomIndex;
        const reloadRoomList = async () => {
            let obj = await queryRoomUserAdd()
            if(obj.code === 200){
                roomList.value = obj.data
            }
            await  updateTheRoomUserList()
        }
        /**
         * 插入房间号
         * @param {房间号的名字} roomName 
         * @param {房间号的根id, 没有根的话就是给一个""} rootRootId 
         */
        const addRoom = async (roomName , rootRootId) => {
            // roomList.value.push(roomItem)

            let params = {
                "roomName": roomName,
                "rootRootId": rootRootId
            }
            let rep = await insertRoom(params)
            if(rep.code === 200){
                roomList.value.push(rep.data)
            }
            else{
                window.alert('请求失败')
            }
        }
        const getRoomList = () => {
            return roomList;
        }
        /**
         * 更新房间号
         */
        const updateTheRoomUserList = async () => {
            let params = {
                roomId: roomList.value[currentRoomIndex.value].id
            }
            let rep =  await queryRoomUser(params)
            if(rep.code === 200){
                roomUserList.value = rep.data
            }
            else {
                window.alert("请求失败")
            }

        }
        watch(() => currentRoomIndex.value, 
                () => updateTheRoomUserList(),
            )
        return {setCurrentRoomIndex, getCurrentRoomIndex , reloadRoomList, addRoom, getRoomList, roomList,  roomUserList}
    }
)