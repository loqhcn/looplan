<template>
    <div class="m-layout">
        <button @click="onXxx">on xxx</button>
        <div>
            <slot name="before"></slot>
            model:<input v-model="model" type="text">
            model:<input v-model="modelAge" type="text">

            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
const model = defineModel();
const modelAge = defineModel('age');

const emit = defineEmits(['change', 'xxx']);
function onXxx() {
    emit('xxx', 'xxx事件')
}
</script>
<style lang="scss"></style>