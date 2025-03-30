# 测试开发组件
Vue 3 + Vite开发一个vue3的组件库


# 功能描述


```

import 


```

# 开发

##  配置vite.config.js
  
```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// const { resolve } = require('path');
import {resolve} from 'path';

export default defineConfig({
	plugins: [vue()],
	build: {
		outDir: 'lib',
		lib: {
			entry: resolve(__dirname, 'src/index.js'),
			name: 'MuloLayer',
			fileName: (format) => `mulo-layer.${format}.js`
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},


			
		},
	},
});


```


## 设置package.json
```json

{

    //设置为公开库
    "private": false,
    //版本
    "version": "1.0.1",
    //开源协议
    "license": "ISC",
    //设置git仓库 
    "repository": {
        "type": "git",
        "url": "https://github.com/loqhcn/mulo-layer.git"
    },
    //入口文件
    "main": "lib/mulo-layer.umd.js"
}
```
## 打包

```
npm run build
```
打包后生成lib/的文件
pickage.json设置main

## 发布

- 设置忽略文件
- `npm publish`   发布到git仓库
```
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*

# 以下是新增的
# 要忽略目录和指定文件
.vscode
example/
src/
public/
vite.config.js
*.map
*.html
```

