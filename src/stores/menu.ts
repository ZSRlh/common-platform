import { reactive, toRefs, watch } from "vue";
import { defineStore } from 'pinia';
import service from "@/assets/axios";
import type { MenuDataItem, MenuReq, MenuRes } from "@/types/menu";

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
    return service<MenuReq, MenuRes>({
      url: '/menu',
      method: 'get',
      data: {
        userName: 'zsr',
      }
    }).then(res => {
      menus.headerMenu = res.menu;
    });
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