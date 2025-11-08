<template>
    <div class="lp-layout">
        数据加载测试

        <div class="gap">
            <button class="btn btn-primary" @click="loadNews()">加载新闻</button>
            <button class="btn btn-primary" @click="addNews()">添加新闻</button>
            <button class="btn btn-primary" @click="addNews_multi()">批量添加新闻</button>
        </div>
        <div class="list test-list">
            <div class="item test-item" v-for="item in state.list" :key="item.id">
                <div class="label">
                    {{ item.title }}
                </div>
                <div class="handles">
                    <button class="btn btn-danger" @click="handleDelete(item.id)">删除</button>
                    <button class="btn btn-primary" @click="editNews(item)">编辑</button>
                </div>
            </div>
        </div>

        <div class="gap">
            <LpPaginate
                v-model:status="state.pageStatus"
                :showQuickJumper="true"
                @change="onPaginateChange"
            />
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import ModelSpace from '@/loader/data/ModelSpace';
import { LpLayer } from 'looplan-ui';
import EditNews from './children/editNews.vue';
import type { PaginatePageStatus } from '@/index';
import LpPaginate from '../../components/lp-paginate.vue';

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
    /**
     * 分页信息
     */
    pageStatus: {
        page: 1,
        limit: 10,
        total: 0,
        hasMore: false,
        lastPage: 1,
    } as PaginatePageStatus,
})

const loadNews = async (page?: number, limit?: number) => {
    const p = page ?? state.pageStatus.page;
    const l = limit ?? state.pageStatus.limit;
    let res = await newsModel.paginate(p, l);
    state.list = res.list;
    state.pageStatus = res.pageStatus;
}

const onPaginateChange = async (ps: PaginatePageStatus) => {
    await loadNews(ps.page, ps.limit);
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
    await loadNews(1, state.pageStatus.limit);
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