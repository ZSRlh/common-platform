<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    :style="{ height: '100%', borderRight: 0 }"
  >
  <template
    v-for="item in menuItems"
    :key="item.key"
  >
    <template v-if="item.isDir">
      <a-sub-menu :key="item.key" :title="item.title">
        <a-menu-item
          v-for="subItem in item.children"
          :key="subItem.key"
          :title="subItem.title"
        >{{ subItem.title }}</a-menu-item>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.key" :title="item.title">{{ item.title }}</a-menu-item>
    </template>
  </template>
  </a-menu>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

const menuStore = useMenuStore();
const { sideMenu } = storeToRefs(menuStore);

const selectedKeys = ref();
const openKeys = ref();
const menuItems = ref();
//TODO: 菜单添加图标
watchEffect(() => {
  menuItems.value = sideMenu.value.map(item => {
    return {
      ...item,
      key: item.key,
      icon: item.icon || 'defaultIcon',
      title: item.title,
      disable: false,
    }
  });
  selectedKeys.value = [sideMenu.value[0].key];
  openKeys.value = [sideMenu.value[0].key];
})

</script>