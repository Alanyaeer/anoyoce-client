<script setup>
import {ref, watch, onMounted, computed} from 'vue'
import {insertAddChatInfo} from '@/api/chat'
import {useRoomStore} from '@/stores'
import {formatDate, FormatTime} from '@/utils/dayUtils'
import { ElMessage } from 'element-plus';
const sendLoading = ref(false)
const sendContent = ref('')
const sendDisabled = ref(true)
const token = localStorage.getItem("token")
const roomStore = useRoomStore()
const windowShow = ref(false);
const timesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const friendList = computed(()=> roomStore.roomUserList)
// const userInfoStore = useUserInfoStore()
const form = ref({
    subject: '任务标题',
    content: '请给用户评价',
    choseFriend: '',
    timegap: [],
    times: 1
})
const currentRoomId = computed(() => roomStore?.roomId)
let socket;
const sendSocket = (message)=>{
    let packMsg = {
        "message":message,
        "type": "chat",
        "token": token,
    }
    socket.send(JSON.stringify(packMsg))
}   
const handleClick = async(type) =>{
    
    if(type === -1){
        windowShow.value = false
        return ;
    }
    sendLoading.value = true;
    let requestParams = {
        "roomId": currentRoomId.value
    }
    let requestBody = {
        "messageType": 0,
        "roomId": currentRoomId.value,
        "message": sendContent.value,
        "anonymous": 0,
        "messageExtension": null,
    }   
    if(type === 1){
        // 参数检查
        if(form.value.choseFriend === ''){
            
            ElMessage.info("你必须填入用户的Id")
            return ;
        }
        form.value.startTime = FormatTime('yyyy-MM-dd hh:mm:ss' ,form.value.timegap[0]) 
        form.value.endTime = FormatTime('yyyy-MM-dd hh:mm:ss' ,form.value.timegap[1])
        windowShow.value = false
        requestBody.messageExtension = JSON.stringify(form.value)
        requestBody.messageType = 1
        console.log(requestBody)
    }
    let requestBodyWithTime = {
        ...requestBody,
        "createTime": formatDate(new Date())
    }
    sendSocket(requestBodyWithTime)
    // 插入消息记录
    await insertAddChatInfo(requestParams, requestBody)
    roomStore
    //清空
    sendContent.value = ""
    sendLoading.value = false
    form.value = {
        subject: '任务标题',
        content: '请给用户评价',
        choseFriend: '',
        timegap: []
    }
}
const changeSendStatus = () =>{
    if(sendContent.value.length > 0) sendDisabled.value = false;
    else sendDisabled.value = true
}
// 初始化房间号socket 连接
const initRoomSocket = () => {
    // 避免房间号没有加载出来， 这里提供了一个重试的方法
    if(currentRoomId.value === undefined || currentRoomId.value === 0){
        setTimeout(() => {
            if(socket === null)
            initRoomSocket();
        }, 300)
        return ;
    }
    let socketUrl = "ws://localhost:8088/room/" + currentRoomId.value
    if(socket != null){
        console.log(socket);
        socket.close()
        socket = null
    }
    socket = new WebSocket(socketUrl, [token])
    socket.onopen = function () {
        console.log("websocket已打开!");
        
    };
    /**
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
      
    }
    socket.onclose = (e)=> {
        console.log('websocket关闭', e.code+ ' '+e.reason+' ' + e.wasClean)
        // 切换用户状态
      // eslint-disable-next-line no-undef
      ElMessage.success('房间切换中')
    }
    socket.onerror =  ()=> {
        // eslint-disable-next-line no-undef
        ElMessage.error('websocket发送错误')
    }
}
const showTaskWindow = () => {
    windowShow.value = true;
}
watch(() => sendContent,
() => changeSendStatus(), 
{deep: true});
watch(() => currentRoomId.value,
() => initRoomSocket(),
{immediate:true})
onMounted(() => {

})
</script>
<template>
    <div class="container">
        <el-dialog v-model="windowShow" title="发布任务" width="500"  center>
            <el-form :model="form" label-width="auto" style="max-width: 600px;display: flex;  flex-direction: column;  gap: 30px;">
                <div style="display: flex; align-items: center;">
                    <div style="white-space: nowrap; word-break: keep-all;  width:70px;">用户账号：</div>
                    <el-select v-model="form.choseFriend" placeholder="用户的名称" style="width: 240px">
                        <el-option
                            v-for="item in friendList"
                            :key="item.id"
                            :label="item.nickName"
                            :value="item.id"
                        />
                    </el-select>
                    <div style="margin-left: 10px; white-space: nowrap; word-break: keep-all;">第几次：</div>
                    <el-select v-model="form.times" placeholder="次数" style="width: 80px;">
                        <el-option
                            v-for="item in timesList"
                            :key="item"
                            :label="item"
                            :value="item"
                        >

                        </el-option>
                    </el-select>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="white-space:nowrap;word-break:keep-all; width: 70px;">时间挑选：</div>
                    <el-date-picker
                        v-model="form.timegap"
                        type="datetimerange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        time-format="A hh:mm:ss"
                    />
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="white-space: nowrap; word-break: keep-all; width: 70px;">主题标题：</div>
                    <a-input placeholder="请输入主题标题" v-model="form.subject" allow-clear/>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="white-space: nowrap; word-break: keep-all; width: 70px;">主题内容：</div>
                    <a-textarea placeholder="请输入主题内容" v-model="form.content" allow-clear/>
                </div>
                <div style="display: flex; position: relative; width: 100%; justify-self: flex-start; gap: 10px;">
                    <a-button @click="handleClick(1)" type="primary">确认</a-button>
                    <a-button @click="handleClick(-1)" type="dashed">取消</a-button>

                </div>
            </el-form>
        </el-dialog>
        <div class="toolbar">
            <div @click="showTaskWindow()">
                <svg t="1713968319160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3272" width="36" height="36"><path d="M742.4 163.84h-2.56V204.8c0 30.72-25.6 58.88-58.88 58.88H343.04c-30.72 0-58.88-25.6-58.88-58.88V163.84H281.6c-46.08 0-81.92 38.4-81.92 81.92v494.08c0 46.08 38.4 81.92 81.92 81.92h460.8c46.08 0 81.92-38.4 81.92-81.92V248.32c0-46.08-35.84-84.48-81.92-84.48zM552.96 563.2h-207.36c-12.8 0-20.48-10.24-20.48-20.48 0-12.8 10.24-20.48 20.48-20.48h207.36c12.8 0 20.48 10.24 20.48 20.48s-10.24 20.48-20.48 20.48z m122.88-99.84H345.6c-12.8 0-20.48-10.24-20.48-20.48 0-12.8 10.24-20.48 20.48-20.48h330.24c12.8 0 20.48 10.24 20.48 20.48s-7.68 20.48-20.48 20.48z m0 0" p-id="3273" fill="#0093F5"></path><path d="M358.4 222.72h307.2c17.92 0 33.28-15.36 33.28-33.28V140.8c0-17.92-15.36-33.28-33.28-33.28H358.4c-17.92 0-33.28 15.36-33.28 33.28v48.64c0 17.92 15.36 33.28 33.28 33.28z m0 0" p-id="3274" fill="#03D2BD"></path></svg>
            </div>
            <svg t="1713968570930" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1849" width="28" height="28"><path d="M502.178909 38.632727c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273z m0 0c-131.072 0-237.521455 104.168727-237.521454 232.727273s106.402909 232.727273 237.521454 232.727273c131.165091 0 237.568-104.168727 237.568-232.727273s-106.309818-232.727273-237.568-232.727273zM413.184 581.678545c-169.472 0-306.874182 134.609455-306.874182 300.590546v19.316364c0 67.909818 137.402182 67.956364 306.874182 67.956363h197.957818c169.425455 0 306.781091-2.513455 306.781091-67.956363v-19.316364c0-165.981091-137.355636-300.590545-306.781091-300.590546H413.184z m0 0" p-id="1850" fill="#0093F5"></path></svg>
        </div>
        <div class="textbar">
            <a-mention v-model="sendContent" style="position: relative; height: 19.4vh; margin-bottom: 2vh;"  :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="输入内容，@指定某个同学" type="textarea"  />
            <a-button style="float: right; " type="primary" :loading="sendLoading" @click="handleClick" :disabled="sendDisabled">发送</a-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    height: max-content;
    .toolbar{
        position: relative;
        display: flex;
        padding: 10px 5px;
        color: #515151;
        gap: 15px;
        .icon{
            cursor: pointer;
            transition: 0.5s;
        }
        .icon:hover{
            color: #0093F5;
        }
        .icon1{
            position: relative;
            cursor: pointer; 
            top: 2px;
        }
    }
    .textbar{
       position: relative;
       width: calc(100% - 20px);
       padding: 0px 10px;
    }
}
</style>