# common-platform

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# Vite + Vue3(TS) + Pinia + Antdv
支持setup语法；

## antdv 配置
### 按需引入
```sh
npm install unplugin-vue-components --save-dev
```
vite.config.ts
```ts
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    /* ... */
    Components({
      resolvers: [AntDesignVueResolver()],
    })
  ],
})
```
### antd组件类型配置
tsconfig.json
```json
"compilerOptions": {
  /* ... */
  "types": [  // 需要包含的类型声明文件列表
    "ant-design-vue/typings/global"
  ]
  },
```

## less 配置
依赖less，vite中不需要less-loader
```sh
npm install less -D
```
vite.config.ts
```ts
export default defineConfig({
  /* ... */
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 全局less变量路径
          hack: `true; @import (reference) "${resolve("src/assets/less/index.less")}"`
        },
        javascriptEnabled: true,
      }
    }
  }
})
```

## mock配置
vite.config.ts
```ts
export default defineConfig(({ command }): UserConfig => ({
  plugins: [
    // ...
    viteMockServe({
      ignore: /^index/, // 忽略index的编译，否则在里面使用import.meta.glob会报类型错误，这个是vite特有的其他编译工具无法识别
      mockPath: 'src/mock', // 解析mock文件目录
      localEnabled: command === 'serve',  // 开发打包开关
      prodEnabled: command !== 'serve',   // 生产打包开关
      supportTs: true,  // 打开后，无法监视js
      // 控制关闭mock的时候，不让mock打包到最终的代码内
      injectCode: `
        import { setupProdMockServer } from './src/mock';
        setupProdMockServer();
      `
    })
  ],
}));
```

或者在main.ts中配置也可以，这里和vite.config.ts中的配置有一个即可。
```ts
if (import.meta.env.MODE === 'development') {
  setupProdMockServer();
}
```
> main.ts中配置，打印输出是在浏览器中，vite.config.ts中配置，打印在node控制台
> 两个地方配置，请求参数不同，vite.config中配置的请求没有method，待研究。



# Vercel 配置
使用vercel部署前端项目，接口使用apizza mock数据（apizza企业版支持https mock）
> 仅为学习部署流程，简化后端数据生成，所以采用此方案

项目部署环境和开发环境不同，直接向apizza发送请求会导致跨域，因此需要对vercel进行配置：

在根目录下创建两个文件：
  1. vercel.json vercel配置；
  2. api/proxy.js 配置代理；

vercel.json
```json
{
  "rewrites": [
    {
      "source": "/rest.apizza.net",   // 要代理的接口路径
      "destination": "/api/proxy"  // 代理配置文件的位置
    }
  ]
}
```

api/proxy.js
> 文件路径随意，代码都可以生效，但是在网站上对构建进行配置的时候只能识别/api/xxx

```sh
npm install -D http-proxy-middleware
```
```js
// 代理中间件
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // 代理的目标服务
  let target = 'http://rest.apizza.net/mock/c93fdfb30dab4ca2008a92a4497f29eb';
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 重写url路径
      "^/rest.apizza.net": "/rest.apizza.net"
    }
  })(req, res);
}
```