<script setup>
import functionTab from '@/views/chat/child/functionTab.vue';
import chatItem from '@/components/chatItem.vue'
import {ref, onMounted, computed, watch} from 'vue'
// import {picWithFunLoading} from '@/utils/loading.ts'
import {debounce} from '@/utils/optimizeUtils.ts'
import {picWithFunLoading} from '@/utils/loading'
import { useRoomStore } from '@/stores'
import {queryRoom} from '@/api/room'
import { ElMessage } from 'element-plus';
import { reactive } from 'vue'
const roomStore = useRoomStore()
const loading = ref(true)
const searchRoomInfo = ref()
const buttonLoading = ref(false)
const roomList = computed(() => roomStore.roomList)
const searchContent = ref('')
const currentChoseRoomIndex = computed(() => roomStore.currentRoomIndex)
const confirmDialogVisible = ref(false)
let tryTimes = 10
const choseRoom = (index) => {
    // 如果存在
    if(currentChoseRoomIndex.value !== undefined){
        let olddiv =  document.getElementsByClassName("wrapperclick")[currentChoseRoomIndex.value]
        // 在第一次操作的时候 多次尝试 知道可以第一个div 出现
        if(olddiv === undefined){
            setTimeout(() => {
                tryTimes -= 1
                // 如果大于等于 0 还可以继续尝试否则不在尝试
                if(tryTimes >= 0)
                    choseRoom(0)
                
            }, 200)
            return 
        }
        // 之前的删除 
        olddiv.style.backgroundColor = '#ffffff'
        olddiv.style.color = '#1F2329'
    }
    // 现在的修改
    let div = document.getElementsByClassName("wrapperclick")[index]
    div.style.backgroundColor = '#DEE6F6'
    div.style.color = '#1456F0'
    roomStore.setCurrentRoomIndex(index)
}
const searchContentFn = async() => {
    let request = {
        "roomId": searchContent.value
    }
    let rep =  await queryRoom(request)
    //响应成功
    if(rep.code === 200){
        searchRoomInfo.value = rep.data
    }
    else {
        ElMessage("暂无该群聊id")
    }
    
}
const deb_searchContentFn = debounce(searchContentFn, 500)
/**
 * 这里存在bug 需要被修复
 */
const addGroupFn = async() => {
    console.log('fajeifa');
    let fn =  picWithFunLoading(buttonLoading, roomStore.joinRoom)
    let rep =  await fn(searchRoomInfo.value.id)
    if(rep === 1){
        roomStore.addRoomInView(searchRoomInfo.value)
    }
}
const showTheConfirmDialogFn = () => {
    // 让他显示出来
    confirmDialogVisible.value = true
}
const form = reactive({//创建群聊表单
  name: '',
  id: '',
  desc: '',
})
const checkName = (name) =>{
    if(!name.trim()){
        alert("请输入群聊名称")
    }
    else{//表单消失
        confirmDialogVisible.value = false
    }
}

watch(() => searchContent.value,
    () => deb_searchContentFn(),
)
onMounted(async () => {
    loading.value = true
    await roomStore.reloadRoomList()
    loading.value = false   
    choseRoom(0)
})
</script>

<template>
    <div class="container">
        <el-dialog v-model="confirmDialogVisible" title="发起群聊" width="500" center>
            <!-- <span>
            It should be noted that the content will not be aligned in center by
            default
            </span> -->
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <div class="form-row">
                    <img src="###" title="群聊头像" alt="群聊头像" class="avatar" />
                    <el-form-item label="群聊名称" class="form-item">
                        <el-input v-model="form.name" placeholder="请输入群聊名称" />
                    </el-form-item>
                </div>
                <el-form-item label="群聊id">
                    <el-input v-model="form.id" placeholder="用户可通过id加入群聊" disabled/>
                </el-form-item>
                <el-form-item label="群公告">
                    <el-input v-model="form.desc" type="textarea" placeholder="初始化群公告"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkName(form.name)">创建</el-button>
                    <el-button @click="confirmDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
            <!-- <template #footer>
            <div class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmDialogVisible = false">
                Confirm
                </el-button>
            </div>
            </template> -->
        </el-dialog>
        <div class="container-left">
            <functionTab></functionTab>
        </div>
        <div class="container-right">
            <div class="wrapperlist" style="padding: 10px 0px; display: flex; justify-content: center; gap: 10px;">
                <a-trigger   position="top" auto-fit-position :unmount-on-close="false" >
                    <a-input-search v-model="searchContent" style="position: relative; width: 80%;" placeholder="添加群聊" search-button/>
                    <template #content>
                        <div style="display: flex; position: relative; padding: 5px;  height: calc(25vh- 10px); width: calc(15vw - 10px); background-color: #F7F9FC; overflow: hidden;">
                            <div v-if="searchRoomInfo !== undefined && searchRoomInfo !== null" style="display: flex; gap: 5px; position: relative; flex-direction: column;justify-content: center; left: 5vw;" >
                                <a-avatar :size="64" shape="square">
                                    <img :src="searchRoomInfo?.roomAvatar">
                                </a-avatar>
                                <div>{{ searchRoomInfo?.roomName }}</div>
                                <a-button :loading="buttonLoading" style="position: relative;" type="primary" @click="addGroupFn()">添加房间号</a-button>
                            </div> 
                            <div v-else style="display: flex; flex-direction: column;justify-content: center; width: 100%;">
                                <a-empty></a-empty>
                            </div>
                        </div>
                    </template>
                </a-trigger>    
                <!-- 添加东西 -->
                <a-button @click="showTheConfirmDialogFn()"  type="primary">
                    <template #icon>
                        <icon-plus />
                    </template>
                </a-button>
            </div>
            <div class="wrapperlist">
                <el-skeleton :loading="loading" animated>
                    <template #template>
                        <div  style="height: 8vh; align-items: center;  display: flex; padding: 5px 15px; gap: 15px;" v-for="index in 9" :key="index">
                            <el-skeleton-item variant="image" style="width: 45px; height: 45px; position: relative; border-radius: 100px;"> </el-skeleton-item>
                            <div style="display: flex; flex-direction: column; gap: 8px ;">
                                <el-skeleton-item  style="width: 85px; height: 15px; position: relative; border-radius: 5px;"> </el-skeleton-item>
                                <el-skeleton-item  style="width: 185px; height: 15px; position: relative; border-radius: 5px;"> </el-skeleton-item>
                            </div>
                        </div>
                    </template>
                    <template #default>
                        <div style="display: flex; flex-direction: column; position: relative; width: 95%;   overflow: hidden;">
                            <chatItem v-for="(item, index) in roomList" @click="choseRoom(index)"  :index="index" :roomInfo="item" :key="item.index" class="wrapper wrapperclick"></chatItem>
                        </div>
                    </template>
                </el-skeleton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    position: relative;
    display: flex;
    .container-left{
        position: relative;
        height: calc(100vh - 1px);
        width: 4vw;
        background-color: #DEE5F5;
        backdrop-filter: blur(10px); /* 背景模糊10像素 */
        display: flex;
        flex-direction: column;
    }
        .container-right{
            position: relative;
            display: flex;
            width: calc(100% - 4vw);
            height: calc(100vh - 1px);
            flex-direction: column;
            overflow-y: auto;
            .wrapperlist{
                display: flex;
                position: relative;
                width: 100%;
                justify-content: center;
                height: auto;

                .wrapper{
                    overflow: auto;
                    transition: 0.5s;
                }
                .wrapperclick{
                    display: flex;
                    color: #1F2329;
                }
                .wrapperclick:hover{
                    background-color: #E4E6E7;

                }
            }
        }   
        .form-row {
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 80px;
            height: 80px;
            margin-right: 50px;
        }
        .form-item {
            display: flex;
            flex: 1; /* 让输入框占据剩余空间 */
        }
}
</style>