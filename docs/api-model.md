[TOC]

# 模型查询

## list
基础使用:
```ts
// 查询新闻列表
newsModel.list(); 
```

自定义参数:
```ts
// 查询新闻列表
newsModel.list({
  status:1,
}); 
```

filter:
```ts
// 查询新闻列表
newsModel.list({
  filter:{
    status:1,
    title:['like','%测试%'],
  }
}); 
```


## paginate

基础使用:
```ts
// 查询新闻列表
const page = 1;
const psize = 10;
const params = {
  filters:{
    status:1,
    money:['>',100],
    title:['like','%测试%'],
    age:['between',[18,30]],
  }
}
newsModel.paginate(page,psize,params); 
```


