<template>
    <div class="lp-layout">
        <button class="btn btn-primary" @click="loadToken">加载token</button>

    </div>
</template>
<script lang="ts" setup>
import { useModelSpace } from '@/index';
import { LpLayer } from 'looplan-ui';
import { ref, reactive, onMounted } from 'vue';

const state = reactive({

})


const mainSpace = useModelSpace('main');
const AuthObj = mainSpace.useCloudObject('Auth');

const loadToken = async () => {
    const token1 = await AuthObj.testSign({
        userId: 1,
    });
    localStorage.setItem('token', token1.data.token);
    LpLayer.toast('加载token成功', {
        duration: 2000,
    });
}

</script>
<script lang="ts">
export default {
    name: 'vbase-auth',
}
</script>
<style lang="scss"></style>