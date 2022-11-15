import { fileURLToPath, URL } from "node:url";

import { defineConfig, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// antdv 按需引入
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "node:path";

// mock配置
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command }): UserConfig => ({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
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
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve("src/assets/style/less/index.less")}"`
        },
        javascriptEnabled: true,
      }
    }
  }
}));
