<script setup>
import {ref, defineProps, computed} from 'vue'
const props = defineProps(
    {
        roomInfo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number
        }
    }
)
const roomInfoItem = computed(() => props.roomInfo)
</script>

<template>
    <div class="container">
        <div style="display: flex; align-items: center; gap: 1vw;">
            <div>
                <el-avatar :size="45" :src="roomInfoItem?.roomAvatar" />
            </div>
            <!-- <img src="" > -->
            <div style="display: flex; flex-direction: column; gap: 1vh;">
                <div style="">{{ roomInfoItem?.roomName }}</div>
                <div>最近过的怎么样</div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    background-color: #FFFFFF;
    position: relative;
    display: flex;
    width: 100%;
    height: 8vh;
    padding: 5px 15px;
    min-height: 8vh;
    cursor: pointer;
    justify-content: space-between;
}
</style>