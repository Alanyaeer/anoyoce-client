<script setup>
import {ref, onMounted, computed} from 'vue'
import {useRoomStore} from '@/stores'
import bloomLoader from '@/components/bloomLoader.vue';
const roomStore = useRoomStore()
const loading = computed(() => roomStore.loading)
// 计算一个排序的列表(根据在线的值进行排序)
const sortedFriendList = computed(() => roomStore.sortedFriendList)

onMounted(() => {

})
</script>
<template>
    <div class="container">
        <div class="wrapperList">
            <el-skeleton :loading="loading" animated>
                <template #template>
                    <div style="position: relative; display: flex; align-items: center; justify-content:center;">
                        <bloomLoader></bloomLoader>
                    </div>
                </template>
                <template #default> 
                    <div v-for="(item, index) in sortedFriendList" class="wrapper" :key="item" style="display: flex; gap: 10px; align-items: center; padding: 5px 10px; width: 88%; border-radius: 5px; position: relative;">
                        <a-avatar :size="25"><!-- 判断是否在线 -->
                            <img style="-webkit-filter: grayscale(50%);"
                                :src="item.avatar"
                            />
                        </a-avatar>
                        <div style="width: 70px; display: flex; margin-left: 10px;  color: #999999;">{{ item.nickName }}</div>
                        <el-tag v-show="item.online === 1" type="success" effect="dark">在线</el-tag>
                        <el-tag v-show="item.online === 0" type="danger" effect="dark">下线</el-tag>
                    </div>  
                </template>
            </el-skeleton>
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
        width: 100%;
        display: flex;
        gap: 10px;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        .wrapper{
            background-color: none;
            transition: 0.5s;
            cursor: pointer;
        }
        .wrapper:hover{
            background-color: #E9E9E9;
        }
    }
}
</style>