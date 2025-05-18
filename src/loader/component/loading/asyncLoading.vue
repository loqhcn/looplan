<template>
    <div class="m-tip">
        Loading...
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
console.log('loading instance', instance);
const state = reactive({

})
</script>
<style lang="scss">
</style>