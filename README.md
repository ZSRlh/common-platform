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

