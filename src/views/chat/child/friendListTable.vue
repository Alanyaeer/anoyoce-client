<script setup>
import {ref, onMounted, computed} from 'vue'
import {useRoomStore} from '@/stores'
const roomStore = useRoomStore()
// 计算一个排序的列表(根据在线的值进行排序)
const sortedFriendList = computed(() => roomStore.sortedFriendList)

onMounted(() => {

})
</script>
<template>
    <div class="container">
        <div class="wrapperList">
            <div v-for="(item, index) in sortedFriendList" :key="item" style="display: flex; gap: 10px; align-items: center; padding: 0px 10px; width: 100%; position: relative;">
                <a-avatar :size="20"><!-- 判断是否在线 -->
                    <img style="-webkit-filter: grayscale(50%);"
                        :src="item.avatar"
                    />
                </a-avatar>
                <div>{{ item.nickName }}</div>
                <el-tag v-show="item.online === 1" type="success" effect="dark">在线</el-tag>
                <el-tag v-show="item.online === 0" type="danger" effect="dark">下线</el-tag>
                <!-- <el-tag type="danger" effect="dark">Tag 5</el-tag> -->
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