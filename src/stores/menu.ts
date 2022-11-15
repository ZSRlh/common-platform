import { reactive, toRefs, watch } from "vue";
import { defineStore } from 'pinia';
import axios from 'axios';

export interface MenuDataItem {
  key: string;
  title: string;
  icon?: string;
  level: number;
  isDir?: boolean;
  children?: MenuDataItem[];
}

export const useMenuStore = defineStore("menuStore", () => {
  const menus = reactive<{
    headerMenu: MenuDataItem[],
    sideMenu: MenuDataItem[],
    currentHeaderNav: String[],
  }>({
    headerMenu: [],
    sideMenu: [],
    currentHeaderNav: [],
  })

  const getMenus = async () => {
    return axios.get('/menu').then(res => {
      menus.headerMenu = res.data;
    })
  };

  const setHeaderNav = (menuKey: String) => {
    menus.currentHeaderNav = [menuKey];
  }
  
  // 选中标签变化时，更新子菜单
  watch(
    () => menus.currentHeaderNav,
    (val) => {
      const menuObj = menus.headerMenu.find(e => e?.key === val[0]);
      menus.sideMenu = menuObj?.children ? menuObj.children : [];
    },
    { immediate: true }
  );

  // 一级菜单变化时，默认选中第一个标签
  watch(
    () => menus.headerMenu,
    (val) => {
      menus.currentHeaderNav = [val[0]?.key];
    },
    { immediate: true }
  )

  return {
    ...toRefs(menus),
    getMenus,
    setHeaderNav,
  };
})