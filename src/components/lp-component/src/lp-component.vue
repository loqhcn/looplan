<template>

    <component v-if="is" :is="AsyncComponent" v-bind="filteredAttrs" v-on="formattedListeners">
        <!-- 透传默认插槽 -->
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotProps">
            <slot :name="name" v-bind="slotProps || {}" />
        </template>
    </component>
    <div v-if="isError" class="m-component-error">
        <div class="error-msg">{{ errorMessage }}</div>
        <button class="btn btn-primary link" @click.stop="onRetry">重试</button>
    </div>

</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, onErrorCaptured, useAttrs, computed, useSlots } from 'vue';
import { setComponentPackage, loadComponent, asyncComponentDelay, asyncLoading, asyncError } from '@/loader/component';



const props = defineProps({
    is: {
        type: String,
        default: ''
    }
})

const isError = ref<boolean>(false);
const errorMessage = ref<string>('');
let retryMethod: any = null;

const AsyncComponent = loadComponent(props.is, {
    // //loading 延迟时间
    // delay: 200,
    // // 超时时间
    // timeout: 3000,
    loadingComponent: asyncLoading,
    errorComponent: function (props: any) {
        // 必须定义errorComponent, 否则loadingComponent会一直显示
        return '';
    },
    onError: (error: any, retry: any, fail: any, attempts: any) => {
        console.error('onError', attempts);
        retryMethod = retry;
        isError.value = true;
        // 设置错误信息
        errorMessage.value = `组件加载失败: ${error.message}`;
        fail();
    }
})

watch(() => props.is, (newVal, oldVal) => {
    if (newVal !== oldVal) {

    }
})

// 重试
function onRetry() {
    // retryMethod && retryMethod();
    isError.value = false;
    errorMessage.value = '';
    retryMethod?.()
}

// 捕获组件内部的错误
onErrorCaptured((err, instance, info) => {
    console.log('onErrorCaptured', err, instance, info);
    // 返回 false 阻止默认的错误处理
    return false;
});

// TODO 参数代理
const $attrs = useAttrs();
// 获取所有插槽
const $slots = useSlots()
console.log('$slots', $slots);
console.log('$attrs', $attrs);



// 过滤非事件属性
const filteredAttrs = computed(() => {
    return Object.keys($attrs).reduce((acc: Record<string, any>, key: string) => {
        if (!key.startsWith('on')) {
            acc[key] = $attrs[key];
        }
        return acc;
    }, {});
});

// 事件格式转换：onXxx -> xxx
const formattedListeners = computed(() => {
    return Object.keys($attrs).reduce((acc: Record<string, any>, key: string) => {
        if (key.startsWith('on')) {
            // 转换事件名：onXxx -> xxx
            const eventName = key.slice(2).replace(/^\w/, (c) => c.toLowerCase());
            acc[eventName] = $attrs[key];
        }
        return acc;
    }, {});
});

// 处理 v-model 的值和事件
const modelProps = computed(() => {
    const props: Record<string, any> = {};
    if ('modelValue' in $attrs) {
        props.modelValue = $attrs.modelValue;
    }
    return props;
});

const modelListeners = computed(() => {
    const listeners: Record<string, any> = {};
    if ('onUpdate:modelValue' in $attrs) {
        listeners['update:modelValue'] = $attrs['onUpdate:modelValue']
    }
    return listeners
})

console.log('filteredAttrs', filteredAttrs.value);
console.log('formattedListeners', formattedListeners.value);

</script>
<script lang="ts">
export default {
    name: 'lp-component',
    // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
    inheritAttrs: false,
}
</script>
<style lang="scss">
.m-component-error {
    color: red;
}
</style>