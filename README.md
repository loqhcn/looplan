\[中文文档\] | \[[English](./docs/engish/README.md)\]
# Looplan

vue3云组件库开发, 目的是用于开发和使用云组件,并封装常用JS库提供快速开发
- 当前处于开发阶段, 不建议在生产环境使用
- 技术讨论QQ群: 1047604746 

# 功能规划
勾选为已实现的功能,未勾选为待开发

- [x] 云组件加载
- [x] - - 自定义组件加载
- [x] - - 配置云组件加载
- [x] - - 组件样式管理
- [ ] - - 云组件上传服务
- [ ] Js常用模块
- [x] - - [JS数据类型](src\lib\data-type\src\JsDataType.ts)
- [x] - - api访问封装
- [ ] - - 文件上传封装
- [ ] - - 云函数集成

- [ ] 云端布局
- [ ] - - 布局渲染
- [ ] - - 布局渲染-自定义插槽


# 使用

> 安装

```bash
# 单独安装
cnpm i looplan -D
# 包含核心功能
cnpm i looplan vue axios -D
```

> 在main.ts中注册(必须把完整的vue挂载到window上)

```js
import { createApp } from 'vue'
import * as Vue from 'vue';
import looplan from 'looplan';

const app = createApp(App);
app.use(looplan); // 注册looplan
app.mount('#app');
window.Vue = Vue; // 挂载到window上,用于加载umd的包
```

## 云组件使用

底层原理是通过添加script标签加载打包好的.umd.js文件, 然后通过异步组件加载组件

```vue
<template>
  <!-- 使用内置的lp-component组件加载在线组件 -->
  <lp-component is="ElementPlus@ElButton" type="primary">
    ElementPlus按钮
  </lp-component>
  
  <!-- 或者使用loadComponent函数 -->
  <component :is="loadComponent('ElementPlus@ElButton')" type="primary">
    ElementPlus按钮
  </component>
</template>

<script setup>
import { loadComponent } from 'looplan';

// 使用代码...
</script>
```

## 注册云组件

> 演示了ElementPlus组件库的注册

> 注册时的cdn可以使用__version__来动态配置版本号

```js
import { registerPackage } from 'looplan';

// 注册Element Plus组件库
registerPackage({
  name: 'ElementPlus',
  title: 'ElementPlus组件库',
  type: 'cdn',
  cdn: 'https://unpkg.com/element-plus@__version__/dist/index.full.js',
  styleCdn: [
    "https://unpkg.com/element-plus@__version__/dist/index.css"
  ],
  styleImportCase: "register", // 样式导入时机: register(注册时导入) 或 use(使用时导入)
  version: '2.9.8',
  keepOfWindow: true, // 是否在window上保留组件库
  components: [
    // 支持字符串和对象形式
    "ElText",
    {
      title: '按钮',
      name: 'ElButton',
      modelType: 'none',
      // 组件级别样式配置
      styleCdn: [
        "https://unpkg.com/element-plus@__version__/dist/xxx.css"
      ],
      styleImportCase: "use", // 组件级别样式导入时机
      // 其他配置
      config: {
        myConfigItem: '自定义配置项'
      }
    }
  ]
});
```

## 注册本地组件

> testCompost.ts


```ts
const packageConfig = {
    name: 'mm',
    title: 'MuloModel内部组件库',
    type: 'local',
    version: '0.0.1',
    components: [
        'Test1',
        'Test2',
    ],
    // 需要异步加载的组件
    asyncComponents: [
        'Test1',
    ]
}

export default {
    packageConfig: packageConfig,
    Test1: () => import('./test1.vue'),
    Test2: import('./test2.vue'),
}
```

> 注册本地组件

```ts
import { registerPackage } from 'looplan';
import testPkg from './testCompost.ts';
// 注册本地组件
registerPackage(testPkg);
```

### 样式管理

Looplan提供了完整的样式管理功能，可以在注册时或使用时导入样式，并支持样式的动态卸载。

#### 样式导入时机

- `register`: 组件包注册时导入样式（默认）
- `use`: 组件使用时导入样式

可以在包级别或组件级别配置样式导入时机：

```js
// 包级别配置
registerPackage({
  // ...
  styleImportCase: "register",
  // ...
});

// 组件级别配置
registerPackage({
  // ...
  components: [
    {
      // ...
      styleImportCase: "use",
      // ...
    }
  ]
});
```

#### 样式管理API

```js
import { 
  loadPackageStyles,
  unloadPackageStyles,
  unloadComponentStyles,
  getLoadedStyleLinks
} from 'looplan';

// 手动加载包样式
await loadPackageStyles('ElementPlus');

// 卸载包样式（同时会卸载该包下所有组件的样式）
unloadPackageStyles('ElementPlus');

// 卸载特定组件样式
unloadComponentStyles('ElementPlus@ElButton');

// 获取当前已加载的所有样式
const styleLinks = getLoadedStyleLinks();
```

#### 样式加载错误处理

- 包级别样式：加载失败时会抛出异常
- 组件级别样式：加载失败时只在控制台打印错误信息，不影响组件渲染

## 云组件开发

## 文件上传
