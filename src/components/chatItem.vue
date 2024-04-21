<script setup>
import {ref} from 'vue'
const imgUrl = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
</script>

<template>
    <div class="container">
        <div style="display: flex; align-items: center; gap: 1vw;">
            <div>

                <el-avatar :size="45" :src="imgUrl" />
            </div>
            <!-- <img src="" > -->
            <div style="display: flex; flex-direction: column; gap: 1vh;">
                <div>你好</div>
                <div>最近过的怎么样</div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    background-color: FFFFFF;
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