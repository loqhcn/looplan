<template>
    <div class="m-layout">
        <div>
            <button class="btn btn-primary">测试</button>
        </div>
        
        <div>
            <lp-component is="looplan-example@LooplanExample"></lp-component>
        </div>

        <div style="margin-top: 16px;">
            <LpPaginate v-model:status="pageStatus" :showQuickJumper="true" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import { setGateway, loadComponent,setComponentPackage ,setIconGateway} from '@/index';
import LpPaginate from '../components/lp-paginate.vue'
import type { PaginatePageStatus } from '@/types/model-client'
setGateway({
    url: 'http://localhost:9000/ComponentGateway.detail',
    name: 'test',
    // 认证
    // token:''
})

const state = reactive({

})

const pageStatus = ref<PaginatePageStatus>({
  page: 1,
  limit: 10,
  total: 123,
  lastPage: Math.max(1, Math.ceil(123 / 10)),
  hasMore: 1 < Math.max(1, Math.ceil(123 / 10)),
})
</script>
<script lang="ts">
export default {
    title:'按钮' 
}
</script>
<style lang="scss">
</style>