<template>
    <div class="lp-layout">
        数据加载测试
        <div class="gap">
            <button class="btn btn-primary" @click="loadToken">加载token</button>
            <button class="btn btn-primary" @click="loadNews('newsModel')">加载新闻</button>
            <button class="btn btn-primary" @click="addNews('newsModel')">添加新闻</button>
            <button class="btn btn-primary" @click="addNews('newsModel')">添加用户新闻</button>
        </div>
        <div class="list test-list">
            <div class="item test-item" v-for="item in state.list" :key="item.id">
                <div class="label">
                    {{ item.title }}
                </div>
                <div class="handles">
                    <button class="btn btn-danger" @click="handleDelete(item.id, 'newsModel')">删除</button>
                    <button class="btn btn-primary" @click="editNews(item, 'newsModel')">编辑</button>
                </div>
            </div>
        </div>

        <lp-panel title="用户新闻">
            <button class="btn btn-primary" @click="loadNews('newsModel_user')">加载新闻</button>
            <button class="btn btn-primary" @click="addNews('newsModel_user')">添加新闻</button>
            <div class="list test-list">
                <div class="item test-item" v-for="item in state.list_user" :key="item.id">
                    <div class="label">
                        {{ item.title }}
                    </div>
                    <div class="handles">
                        <button class="btn btn-danger" @click="handleDelete(item.id, 'newsModel_user')">删除</button>
                        <button class="btn btn-primary" @click="editNews(item, 'newsModel_user')">编辑</button>
                    </div>
                </div>
            </div>
        </lp-panel>

        <lp-panel title="服务提供方新闻">
            <button class="btn btn-primary" @click="loadNews('newsModel_provider')">加载新闻</button>
            <button class="btn btn-primary" @click="addNews('newsModel_provider')">添加新闻</button>
            <div class="list test-list">
                <div class="item test-item" v-for="item in state.list_provider" :key="item.id">
                    <div class="label">
                        {{ item.title }}
                    </div>
                    <div class="handles">
                        <button class="btn btn-danger" @click="handleDelete(item.id, 'newsModel_provider')">删除</button>
                        <button class="btn btn-primary" @click="editNews(item, 'newsModel_provider')">编辑</button>
                    </div>
                </div>
            </div>
        </lp-panel>

    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import ModelSpace from '@/loader/data/ModelSpace';
import { LpLayer } from 'looplan-ui';
import EditNews from './children/editNews.vue';

const coreSpace = new ModelSpace({
    url: 'http://localhost:9000',
    provideToken: () => '123456',
});

const dataSpace = new ModelSpace({
    url: 'http://data-dev.looplan.cn',
    provideToken: () => localStorage.getItem('token') || '',
});

const dataSpace_user = new ModelSpace({
    url: 'http://localhost:9002',
    provideToken: () => localStorage.getItem('token_user') || '',
});

const dataSpace_provider = new ModelSpace({
    url: 'http://localhost:9002',
    provideToken: () => localStorage.getItem('token_provider') || '',
});

const newsModel = dataSpace.useModel('test_dev/sl_test_news'); // dataSpace 新闻模型
const newsModel_user = dataSpace_user.useModel('test_dev/sl_test_news'); // dataSpace_user 用户新闻模型
const newsModel_provider = dataSpace_provider.useModel('test_dev/sl_test_news'); // dataSpace_provider 服务提供方新闻模型

const models: Record<string, any> = {
    newsModel,
    newsModel_user,
    newsModel_provider,
}


const state = reactive({
    list: [] as any[],
    list_user: [] as any[],
    list_provider: [] as any[],
})



const loadNews = async (modelName: string) => {
    // const news = await newsModel.getList();
    // console.log(news);
    const listKey = {
        newsModel: 'list',
        newsModel_user: 'list_user',
        newsModel_provider: 'list_provider',
    }[modelName]
    state[listKey as keyof typeof state] = await models[modelName].list();
}

const handleDelete = async (id: string, modelName: string) => {
    await models[modelName].delete(id);
    loadNews(modelName);
}

const addNews = async (modelName: string) => {
    await models[modelName].add({
        title: '测试新闻' + new Date().getTime(),
    });
    loadNews(modelName);

}

const editNews = (item: any, modelName: string) => {
    LpLayer.Layer.src(EditNews)
        .props({
            item,
            save: async (item: any) => {
                await models[modelName].update(item, item.id);
                loadNews(modelName);
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

const AuthObj = coreSpace.useCloudObject('Auth');

const loadToken = async () => {
    const token1 = await AuthObj.testSign({

    });
    // 加载用户token
    const token_user = await AuthObj.testSign({
        userId: 1
    });
    // 加载服务提供方token
    const token_provider = await AuthObj.testSign({
        userId: 1,
        providerUserId: 3,
    });

    localStorage.setItem('token', token1.data.token);
    localStorage.setItem('token_user', token_user.data.token);
    localStorage.setItem('token_provider', token_provider.data.token);
}



onMounted(async () => {
    await loadToken();
    loadNews('newsModel');
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