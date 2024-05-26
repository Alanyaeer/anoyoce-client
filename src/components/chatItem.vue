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
        <el-popover
            :width="210"
            trigger="hover"
            placement="right"
        >
            <template #reference>
                <div style="display: flex; align-items: center; gap: 1vw;">
                    <div>
                        <!-- <el-avatar :size="45" :src="roomInfoItem?.roomAvatar" /> -->
                        <a-avatar style="background-color: #00d0b6;">
                            <span>{{roomInfoItem?.roomName}}</span>
                        </a-avatar>
                    </div>
                    <!-- <img src="" > -->
                    <div style="display: flex; flex-direction: column; gap: 1vh;">
                        <div style="">{{ roomInfoItem?.roomName }}</div>
                        <div>最近过的怎么样</div>
                    </div>
                </div>  
            </template>
            <template #default>
                <a-typography-text type="secondary" copyable>
                    {{ roomInfoItem?.id }}
                </a-typography-text>
            </template>
        </el-popover>
        
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