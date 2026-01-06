[TOC]

# ModelSpace

- 后端实现通过[looplan-serverless](https://www.npmjs.com/package/looplan-serverless)


## 云函数调用

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

## 模型查询(常用增删改查)

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
