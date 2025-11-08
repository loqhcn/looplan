<template>
    <!-- :class="[$attrs.class]" -->
    <i class="lp-icon" :class="[$attrs.class]" :style="getWrapStyle" v-html="iconText" @click="handleClick" ></i>
</template>

<script lang="ts">
export default {
    name: 'lp-icon'
}
</script>

<script  setup lang="ts">
import { ref, watch, onMounted,computed, useAttrs,withDefaults } from 'vue';
import { isString } from 'lodash-es';
import type { LpIconProps } from '../types';
import { loadIcon, parseIconName } from '../lib';

const emit = defineEmits(['click']);
const $attrs = useAttrs();
const icons: Record<string, string> = {}


const iconText = ref('');
const props = withDefaults(defineProps<LpIconProps>(), {
    is: 'loading',
    size: 12,
    color: '#000000',
})

watch(() => props.is, async (newVal, oldVal) => {
    if (newVal !== oldVal) {
        if (icons[newVal]) {
            iconText.value = "&#x"+icons[newVal];
            return;
        }
        try {
            icons[newVal] = await loadIcon(newVal);
            iconText.value = "&#x"+icons[newVal];
            
        } catch (error) {
            console.error('加载图标失败', error);
        }
    }
}, {
    // 初始化时加载图标
    immediate: true,
})



// const iconText = computed(() => {
//     console.log('iconText computed', props.is, icons);
//     return icons[props.is] || '';
// })

const getWrapStyle = computed(() => {
    const { size, color } = props;
    let fs = size;
    if (isString(size)) {
        fs = parseInt(size, 10);
    }

    return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex',
        fontFamily: "'default'",
    };
});

const handleClick = (e: MouseEvent) => {
    emit('click', e); 
}

</script>

<style lang="scss" >
.lp-icon {
    display: inline;
    //font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    width: 1em;
    height: 1em;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
}
</style>

