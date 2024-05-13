import { defineStore } from "pinia";
import {ref, watch, computed} from 'vue'
import {queryRoomUserAdd, insertRoom, queryRoomUser,addRoom}  from '@/api/room'
import { queryChatInfoList, queryScoreInfo, saveScoreInfo} from '@/api/chat'
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
        const chatWindow = ref(null)
        const currentCardInfo = ref()
        const score = ref(0)
        // 0 表示没有评分过， 1 表示评分过
        const haveScore = ref(0)
        const canScore = ref(0)
        // 传入一个div
        const setChatWindow = (div) => {
            chatWindow.value = div
        }
        const scrollToBottom = () => {
            const scrollDom = chatWindow.value
            if(scrollDom === null || scrollDom === undefined) return;
            scrollDom.scrollTop = scrollDom.scrollHeight
        }
        const personLogin = (userId) => {
            for(let i = 0; i < roomUserList.value.length; ++i){
                if(roomUserList.value[i].id  === userId){
                    roomUserList.value[i].online = 1
                }
            }
        }
        const personLogout = (userId) => {
            for(let i = 0; i < roomUserList.value.length; ++i){
                if(roomUserList.value[i].id === userId){
                    roomUserList.value[i].online = 0;
                }
            }
        }
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
        const updateCurrentCardInfo = (msg) => {
            console.log(msg)
            if(msg?.messageType === 1){
                let now =  new Date()
                let start = new Date(msg?.messageCard.startTime)
                let end = new Date(msg?.messageCard.endTime)
                console.log(start <= now)
                console.log(now <= end)
                if(start <= now && now <= end){
                    console.log('success')
                    currentCardInfo.value = msg.messageCard;
                    score.value = 0
                    haveScore.value = 0
                }
            }
        }
        const setCurrentCardInfo = (message) => {
            updateCurrentCardInfo(message.messageCard)
        }
        const postclean = () => {
            currentCardInfo.value = undefined
            score.value = 0,
            haveScore.value = 0
        }
        /**
         * 更新房间号
         */
        const updateTheRoomUserList = async () => {
            loading.value = true
            chatLoading.value = true
            // 置空
            postclean();
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
                    var tempList = chatRepList.data
                    // 查询 最近的以此记录
                    for(var i = 0; i < tempList.length; ++i){
                        updateCurrentCardInfo(tempList[i])
                    }
                    await queryCurrentScore()

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
                setTimeout(() => {
                    const scrollDom =  chatWindow.value 
                    scrollDom.scrollTop = scrollDom.scrollHeight
                })
            }, 500)
        }
        const addMsgInChatInfoList = (msg) => {
            chatInfoList.value.push(msg) 
            updateCurrentCardInfo(msg)
        }   
        const queryCurrentScore = async () => {
            if(currentCardInfo.value === undefined) return ;
            console.log(currentCardInfo.value)
            let request = {
                roomId: roomId.value, 
                userId: currentCardInfo.value.choseFriend
            }
            console.log(request)
            let rep =  await  queryScoreInfo(request)
            if(rep.code === 200){
                if(rep.data.score !== -1){
                    score.value = rep.data.score
                    haveScore.value = 1;
                }
                else{
                    haveScore.value = 0;
                }
            }
            return score.value
        }
        const updateCurrentScore = async (currentScore) => {
            const messageInfo =  currentCardInfo.value
            if(messageInfo === undefined){
                ElMessage.error("还没有需要你评价的时刻")
            }
            console.log(messageInfo)
            let params = {
                roomId: roomId.value,
                userId: messageInfo.choseFriend,
                score: currentScore
            }
            let rep =  await saveScoreInfo(params)
            if(rep.code === 200 && rep.data === 1){
                ElMessage.success("评分成功")
                score.value = currentScore;
                haveScore.value = 1
            }
            else {
                ElMessage.warning("你不需要重复评价")
            }
        }
        const canScoreFn = () => {
            if(currentCardInfo.value === undefined) canScore.value = 0;
            else canScore.value = 1;
        }
        watch(() => currentRoomIndex.value, 
                () => updateTheRoomUserList(),
            )
        watch(() => currentCardInfo.value,
                ()=> canScoreFn(),
            )
        return {setCurrentRoomIndex,queryCurrentScore,canScore, haveScore,updateCurrentScore, score, setChatWindow,scrollToBottom,setCurrentCardInfo, personLogin , personLogout  ,addMsgInChatInfoList, getCurrentRoomIndex , currentRoomIndex, currentRoomId,roomId, addRoomInView ,joinRoom, reloadRoomList, createRoom, getRoomList, roomList,  roomUserList,chatLoading, loading, chatInfoList, sortedFriendList,currentCardInfo}
    }
)