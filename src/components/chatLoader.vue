<script setup>
</script>

<template>
    <div class="spinner"></div>
</template>
<style lang="scss" scoped>
.spinner {
 width: 56px;
 height: 56px;
 border-radius: 50%;
 padding: 7px;
 background: conic-gradient(from 135deg at top,#004dff 90deg, #0000 0) 0 calc(50% - 4px)/19px 9.5px,
          radial-gradient(farthest-side at bottom left,#0000 calc(100% - 7px),#004dff calc(100% - 6px) 99%,#0000) top right/50%  50% content-box content-box,
          radial-gradient(farthest-side at top,#0000 calc(100% - 7px),#004dff calc(100% - 6px) 99%,#0000) bottom   /100% 50% content-box content-box;
 background-repeat: no-repeat;
 animation: spinner-v8og74 1s infinite linear;
}

@keyframes spinner-v8og74 {
 100% {
  transform: rotate(1turn);
 }
}
</style>