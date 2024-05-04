<script setup>
import functionTab from '@/views/chat/child/functionTab.vue';
import chatItem from '@/components/chatItem.vue'
import searchBox from '@/components/searchBox.vue';
import {ref, onMounted, computed} from 'vue'
import { useRoomStore } from '@/stores'
const roomStore = useRoomStore()
const roomList = computed(() => roomStore.roomList)
onMounted(async () => {
    await roomStore.reloadRoomList()
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
                
                <div style="display: flex; flex-direction: column;">
                    <chatItem v-for="(item, index) in roomList" :roomInfo="item" :key="item.index" class="wrapper"></chatItem>
                </div>
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
                height: auto;
                .wrapper{
                    overflow: auto;
                }
            }
        }   
}
</style>