<template>
    <div class="test-box">
        <slot></slot>
    </div>
</template>
<script setup>
import { ref,reactive,onMounted } from 'vue';

const state = reactive({

})
</script>
<style lang="scss">
.test-box {
    padding: 16px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>