<script setup>
import functionTab from '@/views/chat/child/functionTab.vue';
import chatItem from '@/components/chatItem.vue'
import searchBox from '@/components/searchBox.vue';

</script>

<template>
    <div class="container">
        <div class="container-left">
            <functionTab></functionTab>
        </div>
        <div class="container-right">
            <div class="wrapperlist" style="padding: 10px 0px; display: flex; justify-content: center;">
                <a-input-search style="position: relative; width: 90%;" placeholder="请输入要搜索的内容" loading search-button/>
            </div>
            <div class="wrapperlist">
                <div style="display: flex; flex-direction: column;">
                    <chatItem v-for="item in 12" class="wrapper" :key="item"></chatItem>
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