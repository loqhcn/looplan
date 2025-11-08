<template>
    <div class="lp-layout">
        test-list
        <lp-panel>
            <lp-list ref="newsListRef" :model="newsModel" api-type="list" class="gap">
                <template #default="{ item, onDelete }">
                    <div class="news-item flex justify-between" :key="item.id">
                        <div class="label">
                            {{ item.title }}
                        </div>
                        <div class="handles  gap">
                            <button class="btn btn-primary" @click="editNews(item)">编辑</button>
                            <button class="btn btn-danger" @click="onDelete(item)">删除</button>
                        </div>
                    </div>
                </template>
            </lp-list>
        </lp-panel>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';
import ModelSpace from '@/loader/data/ModelSpace';
import { LpLayer } from 'looplan-ui';
import lpList from './children/lp-list.vue';
import EditNews from './children/editNews.vue';



const coreSpace = new ModelSpace({
    url: 'http://localhost:9002',
    // provideToken: () => localStorage.getItem('token_user')  || '',
});

const newsModel = coreSpace.useModel('test_dev/sl_test_news');
const newsListRef = ref<typeof lpList>();

const editNews = (item: any) => {
    LpLayer.Layer.src(EditNews)
        .props({
            item,
            save: async (item: any) => {
                await newsModel.update(item, item.id);
                newsListRef.value?.reload();
            }
        })
        .container('dialog')
        .show({
            x: 'center',
            y: 'center',
            width: 400,
            height: 300,
        });
}



const deleteNews = async (item: any) => {
    await newsModel.delete(item.id);
    newsListRef.value?.reload();
}



const state = reactive({

})
</script>
<style lang="scss">
.news-item {
    padding: 10px;
    border: 1px solid #ccc;
}
</style>