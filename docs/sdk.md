[TOC]

描述所有looplan导出的方法和组件

# 组件

## LpComponent

- 访问云组件
- 组件名称格式为`组件库名@组件名`

```vue
<template>
  <!-- 使用内置的lp-component组件加载在线组件 -->
  <lp-component is="ElementPlus@ElButton" type="primary">
    这是一个按钮
  </lp-component>
</template>
<script setup lang="ts">
import { LpComponent } from 'looplan';
</script>
```
## LpIcon

- 访问云图标
- 图标名称格式为`图标库名@图标名`
- 默认图标库`default`

```vue
<template>
  <!-- 使用内置的lp-icon组件加载在线图标 -->
  <lp-icon is="default@iconfont" />
</template>
<script setup lang="ts">
import { LpIcon } from 'looplan';
</script>
```

## LpSvg

- 访问云svg图标
- svg图标名称格式为`图标库名@图标名`
- 默认图标库`default`


# 方法

## LooplanException

- 自定义异常类，用于在Looplan中抛出异常。

```ts
throw new LooplanException('这是一个自定义异常');
```

## createApi

- 创建一个api客户端
- 客户端基于axios，默认配置为：

参数:
```ts
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// 定义 options 的类型
interface CreateApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig> | any;
    responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    // 是否注入默认拦截器
    baseInterceptors?: boolean;
}
```

```ts
import { createApi } from 'looplan';
const api = createApi({
  baseURL: 'http://content.lqh.cn',
  timeout: 10000,
  baseInterceptors: true
});
```


## JsDataType

- 获取js数据类型
- 支持类型：`string`, `number`, `boolean`, `object`, `array`, `function`, `null`, `undefined`
```ts
import { JsDataType } from 'looplan';
JsDataType.typeof('123'); // 'string'
JsDataType.typeof(123); // 'number'
JsDataType.typeof(true); // 'boolean'
JsDataType.typeof({}); // 'object'
JsDataType.typeof([]); // 'array'
JsDataType.typeof(() => {}); // 'function'
JsDataType.typeof(null); // 'null'
JsDataType.typeof(undefined); // 'undefined'

// isArray
JsDataType.isArray([]); // true
JsDataType.isArray({}); // false

// isEmpty
JsDataType.isEmpty(''); // true
JsDataType.isEmpty('123'); // false
JsDataType.isEmpty(0); // true
JsDataType.isEmpty(123); // false
JsDataType.isEmpty(true); // true
JsDataType.isEmpty(false); // true
JsDataType.isEmpty({}); // true
JsDataType.isEmpty([]); // true
JsDataType.isEmpty(() => {}); // true
JsDataType.isEmpty(null); // true
JsDataType.isEmpty(undefined); // true

// copyObj
JsDataType.copyObj({ a: 1, b: 2 }); // { a: 1, b: 2 }
```

## registerLooplanComponents

- 注册全局组件
- 包含 lp-component, lp-icon, lp-svg

```ts
import { registerLooplanComponents } from 'looplan';
import type { App } from 'vue';

registerLooplanComponents(app);//vue app
```

## setComponentPackage

- 添加本地组件包
- 添加的组件包无须云加载

```ts
import { setComponentPackage } from 'looplan';
// 导入一本本地组件包
import testPkg from './test_pkg/index.ts'

setComponentPackage(testPkg);
```
本地组件包演示
```ts
const packageConfig = {
    name: 'test',
    title: 'Test组件库',
    type: 'local',
    version: '0.0.1',
    styleCdn: [],
    styleImportCase: "use", // 样式导入时机: register(注册时导入) 或 use(使用时导入)
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

## registerPackage

- 注册云组件库
- 注册后的组件包可以在lp-component中使用
```ts
import { registerPackage } from 'looplan';
registerPackage(packageConfig);
```


- 演示了ElementPlus组件库的注册
- 册时的cdn可以使用__version__来动态配置版本号

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

## loadComponent

- 加载组件
- 返回一个异步组件, 用于加载云组件

```vue

<template>
  <!-- 使用加载的组件 -->
  <component :is="ElButton" type="primary">
    按钮
  </component>
</template>
<script setup lang="ts">
import { loadComponent } from 'looplan';
const ElButton = loadComponent('ElementPlus@ElButton');
</script>
```

## asyncComponentDelay

- 使用`Suspense`来批量加载异步组件时
- asyncComponentDelay可以增加一个最低延迟时间
- @return 一个defineAsyncComponent异步组件

```vue
<template>
  <Suspense>
    <template #default>
        <component :is="asyncComponentDelay(200)"></component>
        <div>    
            <lp-component is="ElementPlus@ElButton" type="primary">ElementPlus按钮</lp-component>
            <lp-component is="ElementPlus@ElButton" type="danger">ElementPlus按钮</lp-component>
        </div>
    </template>
    <template #fallback>
       正在加载...
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import { loadComponent, asyncComponentDelay } from 'looplan';
</script>
```

## nameIsUseAsyncComponent

- 判断组件名称是否为异步组件
- @param name 组件名称
- @return 是否使用了异步组件

```ts
import { nameIsUseAsyncComponent } from 'looplan';
nameIsUseAsyncComponent('ElementPlus@ElButton'); // true
nameIsUseAsyncComponent('Test1'); // false
```

## getComponentOption

- 获取组件配置
- @param name 组件名称
- @return 组件配置(组件包注册时的配置)

```ts
import { getComponentOption } from 'looplan';
const ElPButtonConfig = getComponentOption('ElementPlus@ElButton');
console.log(ElPButtonConfig);
```

## resolveComponent

- 解析组件
- 它支持 app全局注册的组件
- 也支持 云组件库注册的组件
- @param name 组件名称
- @return 组件实例

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

# 样式管理

## loadStyle

- 加载样式（支持包级别和组件级别）

```ts
import { loadStyle } from 'looplan';
await loadStyle('test', ["/css/test-pkg.css"])
```

## unloadStyle

- 卸载样式
- @param name 样式名称,支持组件包名称 或 组件名称(组件包@名称)
- @return 是否成功卸载

```ts
import { unloadStyle } from 'looplan';
// 卸载组件包的样式
unloadStyle('test');

// 卸载组件的样式
unloadStyle('test@TestText');
```


## isStyleLoaded

- 检查样式是否已加载
- @param name 样式名称,支持组件包名称 或 组件名称(组件包@名称)
- @return 是否已加载

```ts
import { isStyleLoaded } from 'looplan';
isStyleLoaded('test'); // true
isStyleLoaded('test@TestText'); // false
```


## getLoadedStyles

- 获取已加载的样式列表
- @return 已加载的样式名称列表
```ts
import { getLoadedStyles } from 'looplan';
const loadedStyles = getLoadedStyles();
console.log(loadedStyles); //HTMLLinkElement[]
```

## unloadAllStyles

- 卸载所有样式
- @return 是否成功卸载所有样式
```ts
import { unloadAllStyles } from 'looplan';
unloadAllStyles();
```

# 网关配置

## gatewayOptions

- @type GatewayOption[]

```ts
import { gatewayOptions } from 'looplan';
console.log(gatewayOptions);
```

## setGateway

- 设置网关配置
- @param options 网关配置
```ts
import { setGateway } from 'looplan';
setGateway([
  {
    name: 'test',
    url: 'http://localhost:3000',
  },
]);
```
参数类型:
```ts
interface GatewayOption {
    /**
     * 网关名称
     */
    name: string;
    /**
     * 网关地址
     */
    url: string;

    /**
     * 组件包列表
     * @todo 设置组件包列表后, 指定组件从这个网关加载
     */
    packages?: string[];

    /**
     * 网关token
     */
    token?: string;
}

```

## getComponentPackage

- 从网关加载组件包

```ts
import { getComponentPackage } from 'looplan';
// 网关加载test组件包
await getComponentPackage('test');
```

## loadIcon
- 从网关加载图标字体

```ts
import { loadIcon } from 'looplan';
// 网关加载test图标字体
await loadIcon('test');
```

## setIconPackage
- 设置图标字体包

```ts
import { setIconPackage,type IconPackageConfig } from 'looplan';
setIconPackage({
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
} as IconPackageConfig);
```

## IconPackages
- 图标字体包列表
```ts
import { IconPackages } from 'looplan';
console.log(IconPackages);
```

## mountIconfont
- 挂载`iconfont`图标库

## unmountIconfont
- 卸载`iconfont`图标库

## iconGatewayOptions
- @type IconGatewayOption[]

## setIconGateway
- 设置图标字体网关配置
- @param options 图标字体网关配置

```ts
import { setIconGateway, type IconGatewayOption } from 'looplan';
setIconGateway({
    name: 'looplan',
    url: 'http://api.looplan.cn/IconGateway.detail',
});
```

## getIconPackage

- 从网关加载图标包
- @param name 图标字体包名称
- @return 图标字体包配置

```ts
import { getIconPackage } from 'looplan';
// 网关加载looplan图标字体包
await getIconPackage('test');
```


# 数据模型


## ModelSpace

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

## ModelClient
- 通过`ModelSpace.useModel(模型名称)`创建模型客户端
- 模型查询(常用增删改查)
```ts
import { ModelSpace } from 'looplan';

const modelSpace = new ModelSpace({
    url: 'http://localhost:9000',
    tokenField: 'token',
    provideToken: () => localStorage.getItem('token') || '',
});

// dataSpace 新闻模型
const newsModel = modelSpace.useModel('test/sl_test_news'); 
// 新增新闻
newsModel.save({
  title:'测试新闻',
}); //访问`BaseUrl/test/sl_test_news.save`
// 修改新闻
let id = 1;
newsModel.save({
  title:'测试新闻修改',
},id); //访问`BaseUrl/test/sl_test_news.update`
// 查询新闻详情
newsModel.row(1); //访问`BaseUrl/test/sl_test_news.row`
// 查询新闻列表
newsModel.list(page,psize); 
// 分页查询
let page = 1;
let psize = 10;
newsModel.paginate(page,psize); //访问`BaseUrl/test/sl_test_news.paginate`
// 大数据分页
let lastIndex = 0;
newsModel.paginateX(lastIndex,{
    "limit": 10,
    "orderType": "ASC",
    "orderField": "id"
}); //访问`BaseUrl/test/sl_test_news.paginateX`
```

## modelSpaceMap
- 模型空间映射表
- @type Record<string, ModelSpace>

## useModelSpace
- 使用模型空间
- @param name 模型空间名称
- @return 模型空间
```ts
import { useModelSpace } from 'looplan';
// 使用looplan模型空间
const mainSpace = useModelSpace('main');
```