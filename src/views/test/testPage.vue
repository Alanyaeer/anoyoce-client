<script setup>
import {ref, onMounted} from 'vue'
const value = 3
const fn = (e) => {
  console.log(e)
}
onMounted(() => {

})
</script>

<template>
  <div class="container"><!-- 底层居中 -->  

  </div>
</template>

<style lang="scss" scoped>

.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>