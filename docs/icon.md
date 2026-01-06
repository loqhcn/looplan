[TOC]

# 云图标使用

## 使用方式

- 图标名称格式为`图标库名@图标名`
- 默认图标库`default`

```html
<template>
  <div>
        <lp-icon is="time" size="24" color="#000000"></lp-icon>
        <lp-icon is="product-fill" size="24"></lp-icon>
        <lp-icon is="LooplanMain@product-fill" size="24"></lp-icon>
  </div>
</template>
<script setup>
import {LpIcon} from 'looplan';
</script>
```

## 网关注册
- 配置后, 访问未加载的图标库, 会自动从网关加载图标库配置

```js
import { setIconGateway } from 'looplan';

setIconGateway({
    name: 'looplan',
    url: 'http://api.looplan.cn/IconGateway.detail',
    // 认证
    // token:''
});
```


## 手动注册图标库

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