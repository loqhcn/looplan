<template>
    <div class="lp-layout">

        <!-- <button class="btn btn-danger" @click="onTest">测试</button> -->
        gateway
        <lp-component is="LooplanHotel@Demo1"></lp-component>
        <!-- <component :is="loadComponent('LooplanHotel@Demo1')"></component> -->

        <lp-component is="LooplanHotel@HotelManagement"></lp-component>



    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted,onUnmounted } from 'vue';
import { setGateway, loadComponent } from '@/index';
import type { GatewayOption } from '@/types/index';
import { LpLayer } from 'looplan-ui';

setGateway({
    url: 'http://localhost:9000/ComponentGateway.detail',
    name: 'test',
    // 认证
    // token:''
})


const onTest = () => {
    LpLayer.toast('测试', {
        duration: 2000
    })
}

const state = reactive({

})
</script>
<style lang="scss"></style>