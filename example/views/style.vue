<template>
    <div class="lp-layout">
        <lp-component is="test@TestText"></lp-component>

        <button @click="unloadPackageStyle">卸载组件包样式</button>
        <button @click="unloadComponentStyle">卸载组件样式</button>
        <button @click="loadTestStyle">加载测试样式</button>
        <button @click="updateStyleStatus">检查样式状态</button>
        <button @click="unloadAllStyles">卸载所有样式</button>

        <div class="style-info">
            <h3>样式状态:</h3>
            <pre>{{ styleStatus }}</pre>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import testPkg from './test_pkg/index.ts'
import {
    setGateway,
    loadComponent,
    setComponentPackage,
    setIconGateway,
    loadStyle,
    unloadStyle ,
    isStyleLoaded,
    getLoadedStyles,
    unloadAllStyles as unloadAllStylesMethod
} from '@/index';

// 设置本地组件库
setComponentPackage(testPkg)

const styleStatus = ref('')

// 更新样式状态
const updateStyleStatus = () => {
    const testStyles = getLoadedStyles('test') || []
    const testTextStyles = getLoadedStyles('test@TestText') || []

    styleStatus.value = `
        test包样式: ${testStyles.length > 0 ? '已加载' : '未加载'} (${testStyles.length}个)
        test@TestText组件样式: ${testTextStyles.length > 0 ? '已加载' : '未加载'} (${testTextStyles.length}个)
    `
}

// 卸载组件包样式
const unloadPackageStyle = () => {
    unloadStyle('test')
    updateStyleStatus()
    console.log('已卸载test组件包样式')
}

// 卸载组件样式
const unloadComponentStyle = () => {
    unloadStyle('test@TestText')
    updateStyleStatus()
    console.log('已卸载test@TestText组件样式')
}

// 加载测试样式
const loadTestStyle = async () => {
    try {
        await loadStyle('test', ["/css/test-pkg.css"])
        updateStyleStatus()
        console.log('已加载test组件包样式')
    } catch (error) {
        console.error('加载样式失败:', error)
    }
}

// 检查样式状态
const checkStyleStatus = () => {
    console.log('test包样式是否已加载:', isStyleLoaded('test'))
    console.log('test@TestText组件样式是否已加载:', isStyleLoaded('test@TestText'))
    updateStyleStatus()
}

// 卸载所有样式
const unloadAllStyles = () => {
    unloadAllStylesMethod()
    updateStyleStatus()
    console.log('已卸载所有样式')
}

onMounted(() => {
    updateStyleStatus()
})
</script>
<script lang="ts">
export default {
    title: '样式测试',
}
</script>
<style lang="scss">
.style-info {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;

    h3 {
        margin-top: 0;
    }

    pre {
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        overflow: auto;
        max-height: 300px;
    }
}

button {
    margin: 5px;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
}
</style>