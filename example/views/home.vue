<template>
    <div class="m-layout">
        <div>
            <h1>首页</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const state = reactive({
    currentDoc: '',
})
</script>
<script lang="ts">
export default {
    title:'首页' 
}
</script>
<style lang="scss"></style>