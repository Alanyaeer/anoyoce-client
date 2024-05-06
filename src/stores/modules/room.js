import { defineStore } from "pinia";
import {ref, watch, computed} from 'vue'
import {queryRoomUserAdd, insertRoom, queryRoomUser,addRoom}  from '@/api/room'
import { queryChatInfoList} from '@/api/chat'
import { ElMessage } from "element-plus";
export const useRoomStore = defineStore(
    'room-info',
    () => {
        const currentRoomIndex = ref(0)
        const currentRoomId = ref(0)
        const roomId = ref(0)
        const roomList = ref([])
        const roomUserList = ref([])
        const chatInfoList = ref([])
        const loading = ref(false)
        const chatLoading = ref(false)
        // 管理一个根据 在线状态进行排序的 friendList
        const sortedFriendList =  computed(() => {
            return roomUserList.value.sort((a, b) => {
              // 假设我们根据 name 字段排序，如果 name 是字符串
              if (a.online < b.online) {
                return 1;
              }
              if (a.online > b.online) {
                return -1;
              }
              return 0; // name 相同时，保持原顺序
            });
          });
        const setCurrentRoomIndex = (id) => {
            console.log(id);
            if(id > roomList.value.length){
                window.alert('出现错误')
                return ;
            }
            else {
                currentRoomIndex.value = id
                currentRoomId.value = roomList.value[id]
                roomId.value = currentRoomId.value.id
            }
        }
        const getCurrentRoomIndex = () => currentRoomIndex;
        const reloadRoomList = async () => {
            let obj = await queryRoomUserAdd()
            if(obj.code === 200){
                roomList.value = obj.data
            }
            if(roomList.value !== null && roomList.value.length !== 0){
                await  updateTheRoomUserList()
            }
        }
        /**
         * 这个是创建一个房间号
         * @param {房间号的名字} roomName 
         * @param {房间号的根id, 没有根的话就是给一个""} rootRootId 
         */
        const createRoom = async (roomName , rootRootId = "") => {
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
            return rep.data
        }
        /**
         * 
         * @param {房间号的id} roomId 
         * @param {房间号的信息} roomInfo
         */
        const joinRoom = async (roomId, roomInfo = null) => {
            let request = {
                "roomId": roomId
            }
            let rep =  await addRoom(request)
            console.log(rep);
            if(rep.code === 200){
                console.log(roomInfo);
                addRoomInView(roomInfo)
                ElMessage.success("加入该房间号")
                return rep.data
            }
            else {
                window.alert("你已经加入这个房间了")
            }
        }   
        /**
         * 
         * @param {房间号的信息} roomInfo 
         */
        const addRoomInView = (roomInfo) => {
            roomList.value.push(roomInfo)
        }
        const getRoomList = () => {
            return roomList;
        }
        /**
         * 更新房间号
         */
        const updateTheRoomUserList = async () => {
            loading.value = true
            chatLoading.value = true
            let currentRoomId = roomList.value[currentRoomIndex.value].id
            let params = {
                roomId: currentRoomId
            }
            let rep =  await queryRoomUser(params)
            if(rep.code === 200){
                roomUserList.value = rep.data
                let requestParams = {
                    roomId: currentRoomId
                }
                let chatRepList = await  queryChatInfoList(requestParams)
                if(chatRepList.code === 200){
                    chatInfoList.value = chatRepList.data
                }
                else{
                    window.alert("请求失败")
                }
            }   
            else {
                window.alert("请求失败")
            }
            setTimeout(() => {
                loading.value = false
            }, 1000);
            setTimeout(() => {
                chatLoading.value = false
            }, 500)
        }
        const addMsgInChatInfoList = (msg) => {
            chatInfoList.value.push(msg) 
        }   
        watch(() => currentRoomIndex.value, 
                () => updateTheRoomUserList(),
            )
        return {setCurrentRoomIndex,addMsgInChatInfoList, getCurrentRoomIndex , currentRoomIndex, currentRoomId,roomId, addRoomInView ,joinRoom, reloadRoomList, createRoom, getRoomList, roomList,  roomUserList,chatLoading, loading, chatInfoList, sortedFriendList}
    }
)