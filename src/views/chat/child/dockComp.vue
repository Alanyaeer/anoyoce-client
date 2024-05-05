<script setup>
import functionTab from '@/views/chat/child/functionTab.vue';
import chatItem from '@/components/chatItem.vue'
import {ref, onMounted, computed, watch} from 'vue'
import { useRoomStore } from '@/stores'
const roomStore = useRoomStore()
const loading = ref(true)
const roomList = computed(() => roomStore.roomList)
const currentChoseRoomIndex = computed(() => roomStore.currentRoomIndex)
const choseRoom = (index) => {
    // 如果存在
    if(currentChoseRoomIndex.value !== undefined){
        let olddiv =  document.getElementsByClassName("wrapperclick")[currentChoseRoomIndex.value]
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
onMounted(async () => {
    loading.value = true
    await roomStore.reloadRoomList()
    loading.value = false   
    // choseRoom(0)
})
</script>

<template>
    <div class="container">
        <div class="container-left">
            <functionTab></functionTab>
        </div>
        <div class="container-right">
            <div class="wrapperlist" style="padding: 10px 0px; display: flex; justify-content: center; gap: 10px;">
                <a-input-search style="position: relative; width: 80%;" placeholder="添加群聊" loading search-button/>
                <!-- 添加东西 -->
                <a-button type="primary">
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
                }
                .wrapperclick:hover{
                    background-color: #F5F5F5;

                }
            }
        }   
}
</style>