[TOC]

# 组件加载

- 支持本地注册和网关加载组件配置


## 基础用法

- 直接使用`lp-component`组件加载在线组件

```vue
<template>
  <!-- 使用内置的lp-component组件加载在线组件 -->
  <lp-component is="ElementPlus@ElButton" type="primary">这是一个按钮</lp-component>
</template>
<script setup lang="ts">
import { LpComponent } from 'looplan';

</script>
```

- 使用`resolveComponent`方法动态加载组件

```vue
<template>
  <div>
    <component :is="ElButton" type="primary">ElementPlus按钮</component>
  </div>
</template>
<script setup lang="ts">
import { resolveComponent } from 'looplan';
const ElButton = resolveComponent('ElementPlus@ElButton');
</script>
```

## 网关配置加载

- 配置网关后,使用未注册的组件自动从网关加载组件配置

```ts
import { setGateway } from 'looplan'

setGateway({
    url: 'http://api.looplan.cn/ComponentGateway.detail',
    name: 'test',
    // 认证
    // token:''
})

```

## 注册云组件

- 演示了`ElementPlus`组件库的注册
- 注册时的cdn可以使用`__version__`来动态配置版本号

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




