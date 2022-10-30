<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="header">
      <div class="logo" />
      <header-menu />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <side-menu />
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import HeaderMenu from './headerMenu.vue';
import SideMenu from './sideMenu.vue';
const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
const openKeys = ref<string[]>(['sub1']);
</script>
<style lang="less" scoped>
.layout-wrapper {
  height: 100%;
  width: 100%;
}
</style>
