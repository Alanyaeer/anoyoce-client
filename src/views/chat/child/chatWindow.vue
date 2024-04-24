<script setup>
import {ref, onMounted} from 'vue'
import TvError from '@/components/TvError.vue';
import friendListTable from '@/views/chat/child/friendListTable.vue'
const test = ref("1");
const roomType = ref(1)
const chatList = ref()
const myId = "111"

onMounted(() => {
    console.log(test.value);
    chatList.value = [
        {
            "pid": '111',
            "msg": "nihao"
        },
        {
            "pid": '121',
            "msg": "nihao"
        },
        {
            "pid": '111',
            "msg": "nihao"
        },
        {
            "pid": '111',
            "msg": "nihao"
        },
        {
            "pid": '111',
            "msg": "nihao"
        },
        {
            "pid": '131',
            "msg": "nihao"
        },
        {
            "pid": '411',
            "msg": "nihao"
        },
        {
            "pid": '111',
            "msg": "nihao"
        },
        {
            "pid": '411',
            "msg": "nihao"
        },
    ]
})
</script>

<template>
    <div class="container">
        <div class="leftWindow">
            <div v-for="(item, index) in chatList" :key="item">
                <div v-if="item?.pid === myId" class="chatme">
                    {{ item.msg }}
                </div>
                <div v-else class="chatfriend">
                    {{ item.msg }}
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
        }
        .chatfriend{
            position: relative;
            float: left;
            width: 100%;
            margin-bottom: 20px;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .chat-text {
                max-width: 90%;
                padding: 20px;
                border-radius: 20px 20px 20px 5px;
                background-color: rgb(56, 60, 75);
                color: #fff;
                &:hover {
                    background-color: rgb(39, 42, 55);
                }
            }
        }
    }   
    .rightCard {
        display: flex;
        position: relative;
        border-left: 5px solid #E9E9E9;
        width: 20vw;
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