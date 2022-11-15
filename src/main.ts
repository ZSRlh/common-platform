import { createApp } from "vue";
import { createPinia } from "pinia";
import Antdv from 'ant-design-vue';

import App from "./App.vue";
import router from "./router";

import "./assets/style/main.css";
import 'ant-design-vue/dist/antd.css'; // 引入antd样式

import { setupProdMockServer } from './mock';

// 这里和vite.config.ts中的配置有一个即可，vite.config.ts中更完善
if (import.meta.env.MODE === 'development') {
  setupProdMockServer();
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antdv);

app.mount("#app");
