<template>
    <div class="async-error">
        组件加载失败:{{ props.error?.message }}
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
const instance = getCurrentInstance();

const props = defineProps({
    error: {
        default: () => {
            return {
                message: '',
            }
        }
    },
    retry: Function,
});
// const props = instance.props;
console.log('instance', props);
const state = reactive({

})
</script>
<style lang="scss">
.async-error {
    color: red;
}
</style>