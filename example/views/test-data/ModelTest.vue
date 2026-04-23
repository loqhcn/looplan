<template>
    <div class="lp-layout">

        
        <lp-panel title="云函数测试">
            <lp-button type="primary" @click="testCloudFunction">测试云函数</lp-button>
            <lp-button type="primary" @click="testCloudObj">测试云对象</lp-button>

        </lp-panel>
        
        <div class="info padding">
            <lp-input v-model="state.modelName" placeholder="请输入模型名称"></lp-input>
            <lp-button type="primary" @click="initModel">加载</lp-button>
        </div>


        <lp-panel title="增删改查">
            <div class="handles">
                <lp-button type="primary" @click="getList">获取列表</lp-button>
                <lp-button type="primary" @click="addItem">添加</lp-button>
            </div>
            <div class="list" style="height: 300px; overflow: auto;">
                <div v-for="item in state.list" :key="item.id" class="item flex">
                    <div class="data" style="width: 80%;">
                        {{ item }}
                    </div>
                    <div class="handles">
                        <lp-button type="primary" @click="delItem(item.id)">删除</lp-button>
                    </div>
                </div>
            </div>
        </lp-panel>

        <lp-panel title="重试测试">
          <lp-button type="primary" @click="getList">获取列表</lp-button>
          <lp-button type="primary" @click="removeToken">移除token</lp-button>

        </lp-panel>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { dataSpace, mainSpace } from '.';
import { LpLayer } from 'looplan-ui';

let model:any = null;
const state = reactive({
    modelName: 'main/sl_test_news',
    list: [] as any[],
})

const initModel = async () => {
    model = dataSpace.useModel(state.modelName);
    LpLayer.toast('加载成功');
}

const getList = async () => {
    let res = await model.list();
    if(res.error){
        console.log('error',res.error.msg);
        LpLayer.toast(res.error.msg,{
            type:'danger'
        })
        return;
    }
    state.list = res?.list || [];
    LpLayer.toast('获取列表成功');
}

const addItem = async () => {
    let res = await model.add({
        title: '测试新闻',
        content: '测试内容',
    });
    LpLayer.toast('添加成功');
    getList();
}

const delItem = async (id: string) => {
    let res = await model.delete(id);
    if(res.error){
        LpLayer.toast('删除失败');
        return;
    }
    LpLayer.toast('删除成功');
    getList();
}

const removeToken = async () => {
    localStorage.removeItem('dataToken');
    LpLayer.toast('移除token成功');
}


async function testCloudFunction(){
    console.log('# %ctest1','color:red')
   const test1 = mainSpace.useCloudFunction('test1');
   const ret = await test1();
   console.log(ret);
}

async function testCloudObj(){
    console.log('# %ctest','color:red')
    const TestObj = mainSpace.useCloudObject('Test');
    const ret = await TestObj.test();
    console.log(ret);

    console.log('# %ctest_args','color:red')

    const TestObj_args = mainSpace.useCloudObject('Test',{
        args: true,
    });
    const ret_args = await TestObj_args.testArgs('张三',12);
    console.log(ret_args);

    console.log('# %ctest_config','color:red')
    const TestObj_config = mainSpace.useCloudObject('Test',{
        args: true,
        config:{
            headers: {
                "content-type":'multipart/form-data',
            },
        }
    });
    const ret_config = await TestObj_config.testArgs('张三',12);
    console.log(ret_config);
    
}

onMounted( () => {
    initModel();
        getList();
})
</script>
<script lang="ts">
export default {
    name: 'ModelTest',
}
</script>
<style lang="scss"></style>