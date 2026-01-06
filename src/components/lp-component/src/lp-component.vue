<template>

    <component v-if="is" :is="AsyncComponent" :key="renderKey" ref="innerRef" v-bind="filteredAttrs"
        v-on="formattedListeners">
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
import { ref, reactive, onMounted, watch, onErrorCaptured, useAttrs, computed, useSlots, markRaw } from 'vue';
import { setComponentPackage, loadComponent, asyncComponentDelay, asyncLoading, asyncError, nameIsUseAsyncComponent } from '@/loader/component';

const props = defineProps({
    is: {
        type: [String, Object, Function] as any,
        default: ''
    }
})

const isError = ref<boolean>(false);
const errorMessage = ref<string>('');
let retryMethod: any = null;

const innerRef = ref<any>(null);
const renderKey = ref<number>(0);
const AsyncComponent = ref<any>(null);

watch(() => props.is as any, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        renderKey.value++
    }
    innerRef.value = null
    isError.value = false
    errorMessage.value = ''
    retryMethod = null
    if (!newVal) {
        AsyncComponent.value = null
        return
    }

    if (typeof newVal === 'string' && nameIsUseAsyncComponent(newVal)) {

        loadComponentInstance(newVal)
    } else {
        AsyncComponent.value = markRaw(newVal as any)
    }
}, { immediate: true })

/**
 * 加载异步组件实例
 * @param newVal 组件名称
 */
function loadComponentInstance(newVal: string) {
    AsyncComponent.value = markRaw(loadComponent(newVal, {
        loadingComponent: asyncLoading,
        errorComponent: function (props: any) {
            return '';
        },
        onError: (error: any, retry: any, fail: any, attempts: any) => {
            console.error('onError', attempts);
            retryMethod = retry;
            isError.value = true;
            errorMessage.value = `组件加载失败: ${error.message}`;
            fail();
        }
    }))
}

// 重试
function onRetry() {
    // retryMethod && retryMethod();
    isError.value = false;
    errorMessage.value = '';
    retryMethod?.()
}

// 捕获组件内部的错误
onErrorCaptured((err, instance, info) => {
    // console.log('onErrorCaptured', err, instance, info);
    // 返回 false 阻止默认的错误处理
    return false;
});

// TODO 参数代理
const $attrs = useAttrs();
// 获取所有插槽
const $slots = useSlots()
// console.log('$slots', $slots);
// console.log('$attrs', $attrs);


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

// console.log('filteredAttrs', filteredAttrs.value);
// console.log('formattedListeners', formattedListeners.value);

const exposedProxy: any = new Proxy({}, {
    get(_target, key) {
        const inst = innerRef.value;
        return inst?.[key as any];
    },
    set(_target, key, value) {
        const inst = innerRef.value;
        if (inst) {
            (inst as any)[key as any] = value;
            return true;
        }
        return false;
    },
    has(_target, key) {
        const inst = innerRef.value;
        return inst ? (key in (inst as any)) : false;
    }
});
defineExpose(exposedProxy);

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
