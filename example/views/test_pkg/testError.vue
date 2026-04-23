<template>
    <div class="">
        测试错误 {{ value }}
        <button class="btn btn-primary" @click="onClick">测试</button>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted, computed } from 'vue';

const state = reactive({

})

const value = computed(()=>{
    // return state.test1.test2 = 123;;
})

function onClick(){
    console.log('测试错误产生情况');
    // @ts-ignore
    state.test1.test2 = 123
}

onMounted(()=>{
   
})
</script>
<script lang="ts">
export default {
    name: 'vbase-ts',
}
</script>
<style lang="scss">
</style>