<template>
  <div class="m-layout">
    <button @click="onTest1">测试1</button>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { createApi } from '@/index'

const api = createApi({
  baseURL: 'http://content.lqh.cn',
  timeout: 10000,
  baseInterceptors: true
});


const onTest1 = () => {
  api.get('/tool/api?model=ct_user&api=list').then((res) => {
    console.log(res)
  })
}

</script>
<script>
export default {
  title: 'http测试'
}
</script>
<style lang="scss"></style>