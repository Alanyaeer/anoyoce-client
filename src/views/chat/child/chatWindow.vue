<script setup>
import {ref, onMounted} from 'vue'
import TvError from '@/components/TvError.vue';
import friendListTable from '@/views/chat/child/friendListTable.vue'
const test = ref("1");
const roomType = ref(1)
const chatList = ref()
const myId = "111"
const test1 = ref("")
onMounted(() => {
    console.log(test.value);
    chatList.value = [
        {
            "pid": '111',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '121',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '111',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2"
        },
        {
            "pid": '111',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2"
        },
        {
            "pid": '111',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '131',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '411',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '111',
            "msg": "nihao",
            "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "createTime": "2024-11-2",
            "name": "3242"
        },
        {
            "pid": '411',
            "msg": "nihao",
            "avatar": "https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202312111855903.webp",
            "createTime": "2024-11-2",
            "name": "3242"
        },
    ]
})
</script>

<template>
    <div class="container">
        <div class="leftWindow">
            <div v-for="(item, index) in chatList" :key="item">
                <div v-if="item?.pid === myId" class="chatme">
                    <div class="chat-text">
                        {{ item.msg }}
                    </div>
                    <div class="info-time ">
                        <span style="position: relative; right: 12px;">{{ item.createTime }}</span>
                        <el-popover
                                :width="250"
                                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px; border-radius: 10px;"
                            >
                            <template #reference>
                                <!-- <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" /> -->
                                <img :src="item.avatar" alt="" />
                            </template>
                            <template #default>
                                <div style="padding: 10px; display: flex;justify-content: center; align-items: center; display: flex; flex-direction: column;">
                                    <el-avatar shape="square" :size="84" :src="item.avatar" />
                                    <span style="margin-top: 10px;">{{ item?.name }}</span>
                                </div>
                            </template>
                        </el-popover>
                        
                    </div>
                </div>
                <div v-else class="chatfriend">
                    <div class="chat-text">

                        {{ item.msg }}
                    </div>
                    <div class="info-time">
                        <el-popover
                                :width="250"
                                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;  border-radius: 10px;"
                            >
                            <template #reference>
                                <!-- <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" /> -->
                                <img :src="item.avatar" alt="" />
                            </template>
                            <template #default>
                                <div style="padding: 10px; display: flex; justify-content: center; align-items: center; display: flex; flex-direction: column;">
                                    <el-avatar shape="square" :size="84" :src="item.avatar" />
                                    <span style="margin-top: 10px;">{{ item.name }}</span>
                                </div>
                            </template>
                        </el-popover>
                        <span >{{ item.createTime }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightCard">
            <div class="rightTop" v-if="roomType===1">
                <TvError></TvError>
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
    .leftWindow{
        padding: 3vh 1.5vw;
        display: flex;
        position: relative;
        width: calc(100% - 20vw - 2px);
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
                    color: rgb(101, 104, 115);
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