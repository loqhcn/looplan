<template>
    <div class="lp-loadmore">
            <button class="btn btn-primary" @click="loadMore">加载更多</button>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';

const emit = defineEmits<{
    (e: 'loadmore'): void
}>()
const state = reactive({

})

const loadMore = () => {
    emit('loadmore')
}
</script>
<script lang="ts">
export default {
    name: 'lp-loadmore',
}
</script>
<style lang="scss">
</style>