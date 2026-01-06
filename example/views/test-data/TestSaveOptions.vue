<template>
    <div class="lp-layout">
        数据加载测试

        <div class="gap">
            <button class="btn btn-primary" @click="loadNews()">加载新闻</button>
            <button class="btn btn-primary" @click="addNews()">添加新闻</button>
            <button class="btn btn-primary" @click="saveOptions()">保存选项</button>
            <button class="btn btn-primary" @click="countOptions()">统计选项</button>
            <button class="btn btn-primary" @click="multiDelete()">批量删除</button>
            <button class="btn btn-primary" @click="exists()">存在</button>
            <button class="btn btn-primary" @click="loadRow()">加载行</button>
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
    url: 'http://localhost:9002',
    provideToken: () => localStorage.getItem('token') || '',
});

const newsModel = dataSpace.useModel('test/sl_test_news'); // dataSpace 新闻模型



const state = reactive({
    list: [] as any[],
})

const loadNews = async () => {
    // const news = await newsModel.getList();
    // console.log(news);

    let res = await newsModel.list();
    state['list'] = res.list || [];
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

const saveOptions = async () => {

    let saveList = JSON.parse(JSON.stringify(state.list));
    saveList = saveList.map((item: any) => {
        return {
            ...item,
            title: item.title + '_' + new Date().getTime(),
        }
    })
    saveList.push({
        title: '测试新闻123',
    })
    saveList.push({
        title: '测试新闻1234',
    })
    saveList.splice(0, 1);
    saveList.splice(0, 1);


    let res = await newsModel.saveOptions(saveList, {

    });
    console.log('保存选项', res);

    loadNews();
}


const editNews = (item: any) => {
    console.log(item);
}

const countOptions = async () => {
    let res = await newsModel.count({
        title: '测试新闻',
    });
    console.log('统计选项', res);
}

const multiDelete = async () => {
    let ids:string[] = [];
    ids.push(state.list[state.list.length - 1].id);
    ids.push(state.list[state.list.length - 2].id);
    let res = await newsModel.multiDelete(ids);
    console.log('批量删除', res);
    loadNews();
}

const exists = async () => {
    let res = await newsModel.exists({
        title: '测试新闻',
    });
    console.log('存在', res);
}

const loadRow = async () => {
    let res = await newsModel.row(state.list[0].id);
    console.log('加载行', res);
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