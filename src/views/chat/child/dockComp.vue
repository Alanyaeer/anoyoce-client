<script setup>

</script>

<template>
    <div class="container">
        <div class="container-left">

        </div>
        <div class="container-right">
            <div style="position: relative;">
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
        background-color: aquamarine;
        display: flex;
        flex-direction: column;
    }
    .container-right{
        position: relative;
        width: calc(100% - 4vw);
        height: calc(100vh - 1px);
        background-color: bisque;
    }   
}
</style>