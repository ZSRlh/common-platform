import { createApp } from "vue";
import { createPinia } from "pinia";
import Antdv from 'ant-design-vue';

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import 'ant-design-vue/dist/antd.css'; // 引入antd样式

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antdv);

app.mount("#app");
