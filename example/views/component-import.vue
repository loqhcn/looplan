<template>
    <div class="lp-layout">
        <lp-panel title="直接导入">
           <test1-geted></test1-geted>
        </lp-panel>

         <lp-panel title="异步导入">
            <div class="tip">let comp = ()=>import('xx.vue')</div>
            <test-synd></test-synd>
        </lp-panel>

         <lp-panel title="Looplan 组件">
            <looplan-test1></looplan-test1>
        </lp-panel>

         <lp-panel title="全局组件">
            <lp-icon1 is="close"></lp-icon1>
        </lp-panel>

         <lp-panel title="函数式组件">
            <func-comp></func-comp>
        </lp-panel>

         <lp-panel title="对象式组件">
            <test-obj-comp></test-obj-comp>
        </lp-panel>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted,getCurrentInstance, render,h } from 'vue';
import Test1 from './test-component/test1.vue';
import { setGateway, loadComponent,setComponentPackage ,setIconGateway} from '@/index';
import { resolveComponent } from '@/index';
import testPkg from './test_pkg/index.ts'
// 设置本地组件库
setComponentPackage(testPkg)
setGateway({
    url: 'http://localhost:9000/ComponentGateway.detail',
    name: 'test',
    // 认证
    // token:''
})
setIconGateway({
    name: 'looplan',
    url: 'http://localhost:9000/IconGateway.detail',
    // 认证
    // token:''
});

const instance = getCurrentInstance();
const app = instance?.appContext?.app;

const testFunctionComponent = ()=>{
    return "testFunctionComponent";
}

const testObjComponent = {
    render() {
        return h("div",{
            style:{
                color:"red"
            }
        }, "testObjComponent");
    }
}

const funcComp = resolveComponent(testFunctionComponent);
const testObjComp = resolveComponent(testObjComponent);
const test1Geted = resolveComponent(Test1);
const testSynd = resolveComponent(()=>import('./test-component/test1.vue'));
const looplanTest1 = resolveComponent('test@Test1');
const lpIcon1 = resolveComponent('lp-icon',app);

</script>


<script lang="ts">
export default {
    name: 'component-import',
    title:'组件导入',
}
</script>
<style lang="scss">
</style>