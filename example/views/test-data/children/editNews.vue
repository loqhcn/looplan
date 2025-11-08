<template>
    <div class="lp-layout">
        新闻编辑
        <div class="form-group">
            <label for="title">标题</label>
            <input type="text" id="title" v-model="props.item.title" />
        </div>
        <button class="btn btn-primary" @click="handleSave">保存</button>
    </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
    item: {
        type: Object,
        default: () => {},
    },
    save: {
        type: Function,
        default: () => {},
    }
})

const handleSave = async () => {
    await props.save(props.item);
    emit('close');
}

</script>
<script lang="ts">
export default {
    name: 'editNews',
}
</script>
<style lang="scss">
</style>