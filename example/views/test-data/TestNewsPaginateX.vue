<template>
    <div class="lp-layout">
        数据加载测试

        <div class="gap">
            <button class="btn btn-primary" @click="loadNews(true)">加载新闻</button>
            <button class="btn btn-primary" @click="addNews()">添加新闻</button>
            <button class="btn btn-primary" @click="addNews_multi()">批量添加新闻</button>
        </div>
        <div class="list test-list">
            <div class="item test-item" v-for="item in state.list" :key="item.id">
                <div class="label">
                   [{{ item.id }}] {{ item.title }}
                </div>
                <div class="handles">
                    <button class="btn btn-danger" @click="handleDelete(item.id)">删除</button>
                    <button class="btn btn-primary" @click="editNews(item)">编辑</button>
                </div>
            </div>
        </div>
        <div class="gap">
            <button class="btn btn-primary" @click="loadNews()">加载更多</button>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import ModelSpace from '@/loader/data/ModelSpace';
import { LpLayer } from 'looplan-ui';
import EditNews from './children/editNews.vue';
import type { PaginateXPageStatus } from '@/types/model-client';

const coreSpace = new ModelSpace({
    url: 'http://localhost:9000',
    provideToken: () => '123456',
});

const dataSpace = new ModelSpace({
    url: 'http://localhost:9002',
    provideToken: () => localStorage.getItem('token') || '',
});

const newsModel = dataSpace.useModel('test_dev/sl_test_news'); // dataSpace 新闻模型



const state = reactive({
    list: [] as any[],
    pageStatus: {} as PaginateXPageStatus,
    lastIndex: 0,
})

const loadNews = async (reset = false) => {
    if (reset) {
        state['list'] = [];
        state['pageStatus'] = {} as PaginateXPageStatus;
        state['lastIndex'] = 0;
    }

    // const news = await newsModel.getList();
    // console.log(news);

    let res = await newsModel.paginateX(state.lastIndex, {
        orderField: 'id',
        orderType: 'DESC',
    });
    state['list'] = res.list || [];
    state['pageStatus'] = res.pageStatus || {};
    state['lastIndex'] = res.pageStatus?.lastIndex || 0;    
    console.log(res);
}

const handleDelete = async (id: string) => {
    await newsModel.delete(id);
    loadNews();
}

const addNews = async () => {
    await newsModel.add({
        title: '测试新闻' + new Date().getTime(),
    });
    loadNews();

}

const addNews_multi = async () => {
    let datas: any[] = [];
    for (let i = 0; i < 10; i++) {
        datas.push({
            title: '测试新闻' + new Date().getTime(),
        });
    }
    let res = await newsModel.multiSave(datas);
    console.log('批量添加新闻', res);
    loadNews();
}

const editNews = (item: any) => {
    console.log(item);
}


onMounted(async () => {
    loadNews();
})


</script>

<style lang="scss">
.test-list {
    width: 500px;
    height: 400px;
    overflow: auto;
}

.test-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>