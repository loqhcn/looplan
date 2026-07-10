<template>
    <div class="lp-layout">
        <lp-panel title="测试切换">
            <div class="box">
                <lp-button @click="onToggle">切换</lp-button>
            </div>
            <div>
                <lp-component :is="currentCmp"></lp-component>
            </div>
        </lp-panel>

        <lp-panel title="测试图标">
            <lp-icon is=""></lp-icon>

            <lp-icon is="xxxx"></lp-icon>

        </lp-panel>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
const currentCmp = ref('Test@test1');
const state = reactive({

})

let flag = true;
function onToggle() {
    currentCmp.value = flag ? 'Test@test1' : 'Timetool@home';
    flag = !flag;
}

</script>
<script lang="ts">
export default {
    name: 'debug',
}
</script>
<style lang="scss"></style>