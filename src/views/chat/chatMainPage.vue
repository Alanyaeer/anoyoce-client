<script setup>
import dockComp from '@/views/chat/child/dockComp.vue';
import chatWindow from '@/views/chat/child/chatWindow.vue'
import chatContent from '@/views/chat/child/chatContent.vue'
import {useUserInfoStore} from '@/stores';

const userInfoStore = useUserInfoStore()
const token = localStorage.getItem("token")
let socket;
import {ref, onMounted} from 'vue'; 
import { checkboxGroupEmits } from 'element-plus';
const userSocketInit = () => {
    // let socketUrl = 'ws://localhost:8080/imserver/' + token    
    // // 关闭之前的连接防止出现问题
    // if(socket != null){
    //     console.log(socket);
    //     socket.close()
    //     socket = null
    // }
    // socket = new WebSocket(socketUrl,  token)
    // console.log(socket);
    // socket.onopen = function () {
    //     console.log('websocket已经打开');
    //     // 发送 一个 消息通知 用户自己登录了
    // }
    // socket.onmessage = function (msg) {
    //     if(msg === ""){
    //         console.log('保持连接测试');
    //         return 
    //     }
    //     console.log("收到数据====" + msg.data)
    //     let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
    //     console.log(data);
    // }
    // socket.onclose = function (e) {
    //   console.log('websocket关闭', e)
    // //   window.alert("websocket关闭")
    // }
    // socket.onerror = function () {
    //   console.log('websocket发送错误', );
    // }
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
      console.log("收到数据====" + msg.data)
      let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      console.log(data);
    //   if (data.users) {  // 获取在线人员信息
    //     // _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
    //   } else {
    //     // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
    //     //  // {"from": "zhang", "text": "hello"}
    //     if (data.from === props.friendInfo.id) {
    //       let cur = JSON.parse(data.text)
    //       if(cur.chatType === 1 && cur.imgType === 2){
    //         srcImgList.value.push(cur.msg)
    //       }
    //       if(cur.chatType === 2) valueUploadList.value.push(100) 
    //       else valueUploadList.value.push(0)
    //       sendMsg(cur, "now")          
    //     }
    //   }
    }
    socket.onclose = (e)=> {
      console.log('websocket关闭', e.code+ ' '+e.reason+' ' + e.wasClean)
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