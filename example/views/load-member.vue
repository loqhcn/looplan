<template>
    <div class="lp-layout">
        <div class="lp-layout__header">
            <h1 class="lp-layout__title">加载组件包的成员</h1>
        </div>
        <div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';
import { loadMember } from '@/loader/component';

const state = reactive({
    member: null,
})

onMounted(async () => {
    const member = await loadMember('Timetool@home');
    console.log('加载的成员:',member);
})
</script>
<script lang="ts">
export default {
    title: 'LoadMember',
}
</script>
<style lang="scss">
</style>