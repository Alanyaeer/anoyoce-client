<script setup>
import dockComp from '@/views/chat/child/dockComp.vue';
import chatWindow from '@/views/chat/child/chatWindow.vue'
import chatContent from '@/views/chat/child/chatContent.vue'

</script>

<template>
    <div>
        <a-split 
            class="containers"
            default-size="350"
            min="300"
            max="450"
        >
            <template #first>
                <dockComp></dockComp>
            </template>
            <template #second>
                <div>
                    <a-split direction="vertical"  default-size="500" max="500" min="500">
                        <template #first>
                            <chatWindow></chatWindow>
                        </template>
                        <template #second>
                            <chatContent></chatContent>
                        </template>
                    </a-split>
                </div>
            </template>
        </a-split>
    </div>
</template>

<style lang="scss" scoped>
.containers{
    height: calc(100vh - 1px);
    width: calc(100vw - 1px);
    min-width: '500px';
    // /* Add your background pattern here */
    // background-color: #ffffff;
    // background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
    // background-size: 30px 30px;
    // background-position: -5px -5px;
    // border: '1px solid var(--color-border)';
}
</style>