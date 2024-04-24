<script setup>
import dockComp from '@/views/chat/child/dockComp.vue';
import searchBox from '@/components/searchBox.vue';
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
                    <a-split direction="vertical" :style="{height: '100%'}" default-size="600" max="600" min="200">
                        <template #first>

                        </template>
                        <template #second>

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
    // border: '1px solid var(--color-border)';
}
</style>