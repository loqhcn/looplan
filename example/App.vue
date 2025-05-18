<template>
  <div class="m-page fullview padding">
    <div class="m-layout x-full auto-center">
      <m-tabs v-model="state.activeTab" :data="state.tabs" type="card" @change="onTab"></m-tabs>
    </div>
    <div class="content pt">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { pages } from '@example/router';
import { useRouter,useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const state = reactive({
  activeTab: 'style',
  currentDoc: '',
  currentPath: '',
  tabs: pages,
  styleMenus: [],
  componentMenus: []
});

const onTab = ({ value }) => {
  console.log(value);
  router.push({
    path: '/' + value
  });
}

onMounted(() => {
  if(route.path == '/') {
    state.activeTab = pages[0].value;
    onTab({
      value: pages[0].value
    })
  }else{
    state.activeTab = route.path.replace('/','');
  }
})

</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>