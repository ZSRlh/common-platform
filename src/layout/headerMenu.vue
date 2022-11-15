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
import { onMounted, ref, watch } from 'vue';

const menuStore = useMenuStore();
const { headerMenu, currentHeaderNav } = storeToRefs(menuStore);

const menuItems = ref();

watch(headerMenu, (val) => {
  menuItems.value = val.map(item => {
    return {
      key: item.key,
      icon: item.icon || 'defaultIcon',
      title: item.title,
      disable: false,
    }
  })
})

onMounted(() => {
  menuStore.getMenus();
})

</script>