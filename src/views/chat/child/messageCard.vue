<script setup>
import {ref, defineProps, computed} from 'vue'
const props = defineProps({
    messageInfo: {
        type: Object,
    }
})
const messageInfo = computed(()=> props.messageInfo)
</script>

<template>
    <a-card style="width: 360px; border-radius: 10px">
        <template #actions>
            <span class="icon-hover"> <IconThumbUp /> </span>
            <span class="icon-hover"> <IconShareInternal /> </span>
            <span class="icon-hover"> <IconMore /> </span>
        </template>
        <template #cover>
            <div
                :style="{
                    height: '204px',
                    overflow: 'hidden',
                }"
            >
                <img
                    :style="{ width: '100%', transform: 'translateY(-20px)' }"
                    alt="dessert"
                    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
                />
            </div>
        </template>
        <a-card-meta :title="messageInfo?.messageCard?.subject">
            <template #description>
                <div style="margin-top:10px; display: flex; flex-direction: column; gap: 10px;">
                    <div style="color: #9C9C9C; font-size:small;">
                        <span>{{ messageInfo?.messageCard?.content }}</span>
                    </div> 
                    <a-progress
                    :percent="0.8"
                    :style="{ width: '100%' }"
                    :color="{
                        '0%': 'rgb(61, 85, 191)', /* 深蓝色 */
                        '100%': 'rgb(170, 98, 229)', /* 紫色 */
                    }"
                    />
                </div>
            </template>
            <template #avatar>
                <div
                :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                <a-avatar :size="24" style="margin-right: 8px;background-color: #14a9f8">
                    {{  messageInfo?.userInfo?.avatar }}
                </a-avatar>
                <a-typography-text>{{  messageInfo?.userInfo?.nickName }}</a-typography-text>
                </div>
            </template>
        </a-card-meta>
    </a-card>

</template>

<style lang="scss" scoped>

</style>