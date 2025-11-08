<template>
    <div class="lp-layout">
        <lp-tabs v-model="state.activeTabIndex" :data="state.list" type="card" model-type="index"></lp-tabs>
        <component :is="state.list[state.activeTabIndex].component"></component>

    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, markRaw } from 'vue';

import TestNews from './test-data/TestNews.vue';
import SlTestNews from './test-data/SlTestNews.vue';
import TestList from './test-data/TestList.vue';
import TestNewsPaginate from './test-data/TestNewsPaginate.vue';
import TestNewsPaginateX from './test-data/TestNewsPaginateX.vue';

const state = reactive({
    activeTabIndex: 1,
    list: [
        {
            name: 'TestNewsPaginate',
            title: '测试新闻分页',
            component: markRaw(TestNewsPaginate)
        },
        {
            name: 'TestNewsPaginateX',
            title: '大数据分页',
            component: markRaw(TestNewsPaginateX)
        },
        {
            name: 'TestNews',
            title: '测试新闻',
            component: markRaw(TestNews)
        },
        {
            name: 'SlTestNews',
            title: '测试新闻[多场景]',
            component: markRaw(SlTestNews)
        },
        {
            name: 'TestList',
            title: '测试列表',
            component: markRaw(TestList)
        }
    ]
})
</script>
<script lang="ts">
export default {
    title: '数据加载',
}
</script>
<style lang="scss"></style>