<template>
    <div class="lp-layout">
        <component :is="renderComponent" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, useAttrs, useSlots } from 'vue';
import { useRenderComponent } from '../lib/RenderComponent';

const attrs = useAttrs()
const slots = useSlots()

const state = reactive({

})
const props = defineProps({
    data: {
        type: [Object, Array],
        default: () => ([])
    }
})
const renderComponent = useRenderComponent(props.data,slots);



onMounted(() => {
    console.log(attrs)
    console.log('layout slots',slots)
})
</script>
<script lang="ts">
export default {
    name: 'LpLayout'
}
</script>
<style lang="scss">

</style>