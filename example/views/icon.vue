<template>
    <div class="lp-layout">

        <lp-icon is="time" size="24" color="#000000"></lp-icon>
        <lp-icon is="product-fill" size="24"></lp-icon>
        <lp-icon is="LooplanMain@product-fill" size="24" color="red"></lp-icon>


    </div>
</template>
<script  setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import { LpIcon } from '@/components/lp-icon';
import {setIconGateway} from '@/index';


setIconGateway({
    name: 'looplan',
    url: 'http://localhost:9000/IconGateway.detail',
    // 认证
    // token:''
});


const state = reactive({

})
</script>
<style lang="scss">
</style>