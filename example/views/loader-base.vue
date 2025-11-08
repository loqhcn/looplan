<template>
    <div class="m-layout">
        云组件加载测试

        <div class="m-panel">
            <div class="title">lp-component测试绑定</div>
            <div class="text-json">
                <pre>{{ state }}</pre>
            </div>
            <lp-component is="test@Test1" v-model="state.name" v-model:age="state.age"></lp-component>
            <lp-component v-if="state.delayShow" is="test@Test2" v-model="state.name" v-model:age="state.age"></lp-component>
        </div>

        <div class="m-panel">
            <div class="title">基础使用</div>
            <div class="module-title">使用vue.component</div>
            <div class="padding-y">
                <div>loadComponent</div>
                <lp-component is="test@Test1"></lp-component>
                <component :is="loadComponent('test@Test2')"></component>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { setComponentPackage, registerPackage, loadComponent, asyncComponentDelay } from '@/loader/component';
import testPkg from './test_pkg/index.ts'

const state = reactive({
    name: '测试',
    age: 18,
    delayShow: false,
})


// 设置本地组件库
setComponentPackage(testPkg)

onMounted(() => {
    setTimeout(() => {
        state.delayShow = true
    }, 1000)
})

</script>

<style lang="scss">
.module-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}
</style>