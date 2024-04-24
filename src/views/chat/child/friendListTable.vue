<script setup>
import {ref, onMounted} from 'vue'
const friendList = ref([])
onMounted(() => {
    friendList.value = [
        {
            userId: "1324",
            avatar: "https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202312111855903.webp",
            nickName: "wujj"
        },
        {
            userId: "1324",
            avatar: "https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202312111855903.webp",
            nickName: "wujj"
        },
        {
            userId: "1324",
            avatar: "https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202312111855903.webp",
            nickName: "wujj"
        },
        {
            userId: "1324",
            avatar: "https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202312111855903.webp",
            nickName: "wujj"
        },
    ]
})
</script>
<template>
    <div class="container">
        <div class="wrapperList">
            <div v-for="(item, index) in friendList" :key="item" style="display: flex; gap: 10px; align-items: center; padding: 0px 10px; width: 100%; position: relative;">
                <a-avatar>
                    <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    />
                </a-avatar>
                <div>{{ item.nickName }}</div>
                
            </div>  
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    position: relative;
    width: 100%;
    height: 100%;
    .wrapperList{
        position: relative;
        width: calc(100% - 20px);
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
}
</style>