\[中文文档\] | \[[English](./docs/engish/README.md)\]
# Looplan

vue3云组件库开发, 目的是用于开发和使用云组件,并封装常用JS库提供快速开发
- 当前处于开发阶段, 不建议在生产环境使用
- 技术讨论QQ群: 1047604746 

# 更新记录
- 2025-11-1 开始集成`looplan-serverless`云函数功能,新增`ModelSpace`对象 [ModelSpace](#modelspace) 
- 2025-9-17 新增`lp-icon`组件,iconfont加载,网关加载
- 2025-9-13 云组件新增网关加载方式


# 目录

- [云组件使用](#云组件使用)
- [云图标使用](#云图标使用)

# 功能规划
勾选为已实现的功能,未勾选为待开发

- [x] 云组件加载
- [x] - - 自定义组件加载
- [x] - - 配置云组件加载
- [x] - - 组件样式管理
- [x] - - 网关加载
- [x] 云图标加载
- [x] -- 网关加载
- [x] -- iconfont图标加载
- [ ] -- svg图标加载
- [ ] -- png图标加载
- [ ] Js常用模块
- [x] - - [JS数据类型](src\lib\data-type\src\JsDataType.ts)
- [x] - - api访问封装
- [ ] - - 云函数集成




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

### 网关注册

```js
import { setGateway, loadComponent } from 'looplan';

setGateway({
    url: 'http://localhost:9000/ComponentGateway.detail',
    name: 'test',
    // 认证
    // token:''
});
```

### 注册云组件

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

### 注册本地组件

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
  unloadStyle
  getLoadedStyles
} from 'looplan';

// 卸载样式
unloadStyle('组件包')
unloadStyle('组件包@组件名')

// 获取已加载的样式
const testStyles = getLoadedStyles('组件包')
const testTextStyles = getLoadedStyles('组件包@组件名')
```

#### 样式加载错误处理

- 包级别样式：加载失败时会抛出异常
- 组件级别样式：加载失败时只在控制台打印错误信息，不影响组件渲染

### 云组件开发

## 云图标使用

### 注册网关方式

```html

<template>
  <div>
        <lp-icon is="time" size="24" color="#000000"></lp-icon>
        <lp-icon is="product-fill" size="24"></lp-icon>
        <lp-icon is="LooplanMain@product-fill" size="24"></lp-icon>
  </div>
</template>

<script setup>
import { setIconGateway } from 'looplan';

setIconGateway({
    name: 'looplan',
    url: 'http://localhost:9000/IconGateway.detail',
    // 认证
    // token:''
});
</script>

```

> 请求参数

```json
{
  // 组件名称
  "name": "组件包名称"
}
```

> api返回结构

[查看类型定义 IconPackageConfig](src\components\lp-icon\types\index.ts) 

```json
{
    "code": 200,
    "msg": "获取成功",
    "data": {
        "row": {
            "name": "LooplanMain",
            "title": "Looplan主图库",
            "type": "iconfont",
            "data": {
                "woff": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.woff?t=1758056482880",
                "woff2": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.woff2?t=1758056482880",
                "truetype": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.ttf?t=1758056482880"
            },
            "icons": {
                "up": "e958",
                "add": "e8e5",
                "all": "e96a",
                "atm": "e8ea"  
            },
            "version": "1.0.0"
        }
    },
    "time": "2025/9/17 06:48:56"
}
```

### 配置方式

```html
<template>
  <div>
        <lp-icon is="LooplanMain@time" size="24" color="#000000"></lp-icon>
        <lp-icon is="LooplanMain@product-fill" size="24"></lp-icon>
  </div>
</template>

<script lang="ts" setup>
import { setIconPackage,type IconPackageConfig } from 'looplan';
const packageConfig:IconPackageConfig = {
    name: 'LooplanMain',
    title: 'Looplan主图库',
    type: 'iconfont',
    version: '1.0.0',
    data: {
              "woff": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.woff?t=1758056482880",
              "woff2": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.woff2?t=1758056482880",
              "truetype": "//at.alicdn.com/t/c/font_5023527_zm5td5w40ac.ttf?t=1758056482880"
    },
    icons: {
        'time': 'e958',
        'product-fill': 'e8e5',
    }
}
setIconPackage(packageConfig);
</script>
```

## ModelSpace

- 后端实现通过[looplan-serverless](https://www.npmjs.com/package/looplan-serverless)

### 模型查询(常用增删改查)

```ts
import { ModelSpace } from 'looplan';

const modelSpace = new ModelSpace({
    url: 'http://localhost:9000',
    tokenField: 'token',
    provideToken: () => localStorage.getItem('token') || '',
});

// dataSpace 新闻模型
const newsModel = modelSpace.useModel('test_dev/sl_test_news'); 
// 新增新闻
newsModel.save({
  title:'测试新闻',
}); //访问`BaseUrl/test_dev/sl_test_news.save`
// 修改新闻
let id = 1;
newsModel.save({
  title:'测试新闻修改',
},id); //访问`BaseUrl/test_dev/sl_test_news.update`
// 查询新闻详情
newsModel.row(1); //访问`BaseUrl/test_dev/sl_test_news.row`
// 查询新闻列表
newsModel.list(page,psize); 
// 分页查询
let page = 1;
let psize = 10;
newsModel.paginate(page,psize); //访问`BaseUrl/test_dev/sl_test_news.paginate`
// 大数据分页
let lastIndex = 0;
newsModel.paginateX(lastIndex,{
    "limit": 10,
    "orderType": "ASC",
    "orderField": "id"
}); //访问`BaseUrl/test_dev/sl_test_news.paginateX`
```
### 云函数调用
```ts
const modelSpace = new ModelSpace({
    url: 'http://localhost:9000',
    tokenField: 'token',
    provideToken: () => localStorage.getItem('token') || '',
});

// 调用云函数
const TestFunc = modelSpace.useCloudFunction('test');
let result = await TestFunc({
  name:'测试函数',
})

// 调用云对象
const TestObj = modelSpace.useCloudObject('testObj');
// 访问test1方法
let result = await TestObj.test1({
  name:'测试对象',
})

```