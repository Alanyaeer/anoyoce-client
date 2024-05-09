<script setup>
import dockComp from '@/views/chat/child/dockComp.vue';
import chatWindow from '@/views/chat/child/chatWindow.vue'
import chatContent from '@/views/chat/child/chatContent.vue'
import {useUserInfoStore, useRoomStore} from '@/stores';
const roomStore = useRoomStore()
const userInfoStore = useUserInfoStore()
const token = localStorage.getItem("token")
let socket;
import {ref, onMounted} from 'vue'; 
const userSocketInit = () => {
    let userId = localStorage.getItem("token")
    let socketUrl = "ws://localhost:8088/user/" + userId
    if(socket != null){
      console.log(socket);
      socket.close()
      socket = null
    }
    socket = new WebSocket(socketUrl, [token])
    socket.onopen = function () {
        console.log("websocket已打开");
        console.log(socket)
        userInfoStore.changeUserOnlineStatus(1)
    };
    /**
     * 这是消息的发送
     * {
     *     "type": 1,
     *      "msg": obj
     * }
     * 这是消息的接受
     * {
     *      "type" : 2,
     *      "msg": obj
     * }
     * @param {*} msg 
     */
    socket.onmessage = function (msg) {
      if(msg === ""){
        console.log('保持连接测试');
        return 
      }
      let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      console.log(data)
      if(data.type === "chat"){
        roomStore.addMsgInChatInfoList(data.message)
      }
      else if(data.type === 'login'){
        // roomStore.addRoomInView(data.userId);
        roomStore.personLogin(data.userId)
      }
      else if(data.type === 'logout') roomStore.personLogout(data.userId)

    }
    socket.onclose = (e)=> {
      console.log('websocket关闭', e.code+ ' '+e.reason+' ' + e.wasClean)
      // 切换用户状态
      userInfoStore.changeUserOnlineStatus(0);
      setTimeout(() => {
        socket.onopen()
      }, 60000)
      // eslint-disable-next-line no-undef
      ElMessage('websocket关闭')
    }
    socket.onerror =  ()=> {
      // eslint-disable-next-line no-undef
      ElMessage.error('websocket发送错误')
    }
}
onMounted(async () => {
    // 检测 token 跳转到login 页面
    userSocketInit()
    if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
        // window.location.href = 
    }

    await userInfoStore.reloadUserInfo()
    //初始化 websocket 
})
</script>

<template>
    <div style="position: absolute;">
        <a-split 
            class="containers"
            default-size="350"
            min="300"
            max="450"
        >
            <template #first>
                <dockComp ></dockComp>
            </template>
            <template #second>
                <div>
                    <a-split direction="vertical"  default-size="500" max="500" min="500">
                        <template #first>
                            <chatWindow></chatWindow>
                        </template>
                        <template #second>
                            <chatContent></chatContent>
                        </template>
                    </a-split>
                </div>
            </template>
        </a-split>
    </div>
</template>

<style lang="scss" scoped>
.containers{
    height: calc(100vh - 1px);
    width: calc(100vw - 1px);
    min-width: '500px';
    // /* Add your background pattern here */
    // background-color: #ffffff;
    // background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
    // background-size: 30px 30px;
    // background-position: -5px -5px;
    // border: '1px solid var(--color-border)';
}
</style>