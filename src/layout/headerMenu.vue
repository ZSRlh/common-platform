<template>
  <a-menu
    v-model:selectedKeys="currentHeaderNav"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item
      v-for="item in menuItems"
      :key="item.key"
      :title="item.title"
    >{{ item.title }}</a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const menuStore = useMenuStore();
const { headerMenu, currentHeaderNav } = storeToRefs(menuStore);

const menuItems = ref(headerMenu.value.map(item => {
  return {
    key: item.key,
    icon: item.icon || 'defaultIcon',
    title: item.title,
    disable: false,
  }
}));

</script>