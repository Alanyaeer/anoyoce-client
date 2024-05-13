<script setup>
import {ref, onMounted, computed, watch} from 'vue'
import TvError from '@/components/TvError.vue';
import friendListTable from '@/views/chat/child/friendListTable.vue'
import messageCard from '@/views/chat/child/messageCard.vue'
import chatLoader from '@/components/chatLoader.vue';
import {useRoomStore, useUserInfoStore} from '@/stores'
import {formatDate} from '@/utils/dayUtils'
import {saveScoreInfo} from '@/api/chat'
const roomStore = useRoomStore()
const userInfoStore = useUserInfoStore()
const roomType = ref(1)
const score = computed(() => roomStore.score)
const chatList = computed(() => roomStore.chatInfoList)
const chatWindow = ref(null)
const myUserInfo = computed(() => userInfoStore.userInfo.id)
const loading = computed(() => roomStore.chatLoading)
const haveScore = computed(() => roomStore.haveScore)
const canScore = computed(() => roomStore.canScore)
// 当加载了chatWindow 出来之后 
const innerRoom = () => {
    console.log(chatWindow.value)
    if(chatWindow.value !== null) 
    roomStore.setChatWindow(chatWindow.value)
    const scrollDom = chatWindow.value
    scrollDom.scrollTop = scrollDom.scrollHeight
}
// 不一样 
// 修改 = 》 成功 

const scoreUser = async (currentScore) => {
    await roomStore.updateCurrentScore(currentScore)
}
watch(() => chatWindow.value,
    () => innerRoom()
)
onMounted(() => {
    
})
</script>

<template>
    <div class="container">
        <div class="leftWindow" ref="chatWindow">
            <el-skeleton style="position: relative; height: 100%;" :loading="loading" animated>
                <template #template>
                    <div style="display: flex; position: relative; top: 45%; left: 50%; translate: 0% -50%">
                        <chatLoader></chatLoader>
                    </div>
                </template>
                <template #default>
                    <div v-for="(item, index) in chatList" :key="item" >
                        <div v-if="item?.self === 1" class="chatme">
                            <div v-if="item?.messageType === 0" class="chat-text">
                                {{ item?.message }}
                            </div>
                            <div v-if="item?.messageType === 1">
                                <messageCard :messageInfo="item"></messageCard>
                            </div>
                            <div class="info-time ">
                                <span style="position: relative; right: 12px;">{{ formatDate(item?.createTime) }}</span>
                                <el-popover
                                        :width="250"
                                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px; border-radius: 10px;"
                                    >
                                    <template #reference>
                                        <img :src="item?.userInfo?.avatar" alt="" />
                                    </template>
                                    <template #default>
                                        <div style="padding: 10px; display: flex;justify-content: center; align-items: center; display: flex; flex-direction: column;">
                                            <el-avatar shape="square" :size="84" :src="item?.userInfo?.avatar" />
                                            <span style="margin-top: 10px;">{{ item?.userInfo?.nickName }}</span>
                                        </div>
                                    </template>
                                </el-popover>
                                
                            </div>
                        </div>
                        <div v-else class="chatfriend">
                            <div class="chat-text">
                                {{ item?.message }}
                            </div>
                            <div class="info-time">
                                <el-popover
                                        :width="250"
                                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;  border-radius: 10px;"
                                    >
                                    <template #reference>
                                        <img :src="item?.userInfo?.avatar" alt="" />
                                    </template>
                                    <template #default>
                                        <div style="padding: 10px; display: flex; justify-content: center; align-items: center; display: flex; flex-direction: column;">
                                            <el-avatar shape="square" :size="84" :src="item?.userInfo?.avatar" />
                                            <span style="margin-top: 10px;">{{ item?.userInfo?.nickName }}</span>
                                        </div>
                                    </template>
                                </el-popover>
                                <span >{{  formatDate(item?.createTime) }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="chatList.length === 0" style="display: flex; position: relative; top: 50%; translate: 0% -50%">
                        <a-empty >
                            暂无聊天记录
                        </a-empty>
                    </div>
                </template>
            </el-skeleton>
        </div>
        <div class="rightCard">
            <div class="rightTop" v-if="roomType===1">
                <a-card style="position:relative; width: 100%; border-radius: 15px;"  :title="canScore === 1 ? '请为用户评分': '暂时不需要进行评分'">
                    <template #extra>
                        <div v-if="canScore === 1">
                            <el-tooltip v-if="haveScore === 1" content="已完成评分" placement="top" effect="light">
                                <svg style="color: #35C254; position: relative; " xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill:none viewBox="0 0 14 14" width="20" height="20"><path stroke-linecap="round" fill="none" stroke-linejoin="round" stroke-width="1.2" d="M12.598 7a5.6 5.6 0 11-3.15-5.037m2.1 1.537l-4.9 4.9-1.4-1.4"></path></svg>
                            </el-tooltip>
                            <el-tooltip v-else content="未完成评分" placement="top" effect="light">
                                <!-- <svg style="color: #35C254; position: relative; left: -20px;" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill:none viewBox="0 0 14 14" width="20" height="20"><path stroke-linecap="round" fill="none" stroke-linejoin="round" stroke-width="1.2" d="M12.598 7a5.6 5.6 0 11-3.15-5.037m2.1 1.537l-4.9 4.9-1.4-1.4"></path></svg> -->
                                <svg style="color: #FFB800; position: relative; " xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" fill=none class="h-4.5 w-4.5 text-lc-yellow-60 dark:text-dark-lc-yellow-60 inline-block shrink-0 fill-none stroke-current"><path stroke-width="2" d="M18 12a6.002 6.002 0 01-5.004 5.918c-.545.09-.996-.366-.996-.918V7c0-.552.451-1.009.996-.918A6.002 6.002 0 0118 12z"></path><path stroke-width="2" d="M21.6 12a9.6 9.6 0 01-9.6 9.6 9.6 9.6 0 119.6-9.6z" clip-rule="evenodd"></path></svg>
                            </el-tooltip>
                        </div>
                    </template>
                    <a-space style="display: flex; justify-content: center;">
                        <a-rate v-if="canScore===1"  @change="scoreUser" v-model="score"  :count="8"/>
                        <div v-else>
                            <img style="width: 80px; height: 80px;" src="@/assets/img/empty.png" />
                        </div>
                    </a-space>
                </a-card>
            </div>

            <div class="rightBottom">
                <friendListTable></friendListTable>
            </div>      
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    position: relative;
    display: flex;  
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .leftWindow{
        padding: 3vh 1.5vw;
        display: flex;
        position: relative;
        width: calc(100% - 20vw - 2px);
        height: 100%;
        word-break: break-all;
        flex-direction: column;
        background-color: #F2F2F2;
        overflow-y: auto;
        .chatme{
            width: 100%;
            float: right;
            margin-bottom: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            .chat-text{
                float: right;
                max-width: 90%;
                padding: 20px;
                border-radius: 20px 20px 5px 20px;
                background-color: rgb(29, 144, 245);
                color: #fff;
                &:hover {
                background-color: rgb(26, 129, 219);
                }
            }
            .info-time {
                margin: 10px 0;
                color: #0c465b;
                font-size: 14px;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                span:last-child {
                    color: rgb(101, 104, 115);
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
        .chatfriend{
            position: relative;
            float: left;
            margin-bottom: 20px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .chat-text {
                max-width: 90%;
                padding: 20px;
                border-radius: 20px 20px 20px 5px;
                background-color: #FFFFFF;
                color: black;
                &:hover {
                    background-color: #eaeaea;
                }
            }
            .info-time {
                margin: 10px 0 10px 0px;
                color: #9C9C9C;
                font-size: 14px;
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                span:last-child {
                    color: rgb(19, 65, 102);
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
    }   
    .rightCard {
        display: flex;
        position: relative;
        border-left: 5px solid #E9E9E9;
        width: 20vw;
        background-color: #F2F2F2;  
        height: 100%;
        flex-direction: column;
        .rightTop{
            position: relative;
            display: flex;
            height: 25vh;
            border-radius: 5px;
            padding: 3px 10px;
        }
        .rightBottom{
            margin-top: 20px;
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
}
</style>