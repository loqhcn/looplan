<template>
    <div class="m-layout">
       Test2 {{ props.name }}
    </div>
</template>
<script setup>
import { ref,reactive,onMounted } from 'vue';


const props = defineProps({
    name: {
        type: String,
        default: '测试2',
    },
})

const state = reactive({

})

function test2() {
    console.log('test2')
}

defineExpose({
    test2,
})

</script>
<style lang="scss">

</style>