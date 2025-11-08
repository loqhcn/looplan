<template>
    <div class="list">
        <div class="title">list</div>
        <div class="list__item" v-for="item in state.listRender" :key="item.id">
            <slot :item="item" :onDelete="onDelete"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { ModelClient } from '@/index';
import { LpLayer } from 'looplan-ui';
interface ListProps {
    list?: any[];
    model: ModelClient;
    apiType: string;
}

const props = withDefaults(defineProps<ListProps>(), {
    list: () => [],
    api: '',
    apiType: 'list'
})

const state = reactive({
    listRender: [] as any[]
});

async function loadList() {
    const model = props.model;
    if (props.apiType === 'list') {
        state.listRender = await model.list();
    }
}

async function onDelete(item: any) {
    // 确认删除
    let isConfirm = await LpLayer.confirm({
        title: '确认删除',
        message: `确定删除吗？`
    })
    if (!isConfirm) {
        return;
    }
    // 删除
    await props.model.delete(item.id);
    reload();
}

onMounted(async () => {
    await loadList();
})

const reload = async () => {
    await loadList();
}

const loadmore = async () => {
    await loadList();
}

defineExpose({
    reload,
    loadmore
})

</script>
<script lang="ts">
export default {
    name: 'lp-list',
}
</script>
<style lang="scss"></style>