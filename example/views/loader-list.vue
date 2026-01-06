<template>
    <div class="m-layout">
        列表组件加载测试

        <div>
            <div class="module-title">列表渲染测试</div>
            <div class="padding-y">
                <div class="list-panels">
                    <lp-component v-for="item in listItems" is="test@Test2" :key="item.id"></lp-component>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {
    setComponentPackage,
    loadComponent,
    asyncComponentDelay,
    registerPackage,
    loadStyle,
    unloadStyle,
    isStyleLoaded,
    getLoadedStyles,
    unloadAllStyles
} from '@/loader/component';
import testPkg from './test_pkg/index.ts'

const listItems = ref<Array<{ id: number; is: string }>>([
    { id: 1, is: 'test@Test1' },
    { id: 2, is: 'test@Test2' },
    { id: 3, is: 'test@Test1' },
]);
function toggleItemIs(item: { id: number; is: string }) {
    item.is = item.is.includes('Test1') ? 'test@Test2' : 'test@Test1';
}

onMounted(() => {

})

</script>

<style lang="scss">
.module-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
}

.sub-title {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 8px;
}

.style-info {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;

    ul {
        margin: 0;
        padding-left: 20px;

        li {
            margin: 5px 0;
        }
    }
}

.m-panel {
    background: #fff;
    border: 1px solid #ebedf0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.toggle-info {
    padding: 6px 10px;
    background: #f5f7fa;
    border: 1px solid #eaecef;
    border-radius: 6px;
    font-size: 13px;
    color: #666;
}

.toggle-panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 12px;
}

.panel {
    border: 1px dashed #e0e3e7;
    border-radius: 8px;
    padding: 12px;
}

.list-panels {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
</style>
