import { reactive, toRefs, watch } from "vue";
import { defineStore } from "pinia";
import type { MenuDataItem } from "@/types/menu";
import { getMenus } from "@/api";

export const useMenuStore = defineStore("menuStore", () => {
  const menus = reactive<{
    headerMenu: MenuDataItem[];
    sideMenu: MenuDataItem[];
    currentHeaderNav: string[];
  }>({
    headerMenu: [],
    sideMenu: [],
    currentHeaderNav: [],
  });

  const _getMenus = async () => {
    getMenus({ userName: "zsr" }).then((res) => {
      menus.headerMenu = res.menu;
    });
  };

  const setHeaderNav = (menuKey: string) => {
    menus.currentHeaderNav = [menuKey];
  };

  // 选中标签变化时，更新子菜单
  watch(
    () => menus.currentHeaderNav,
    (val) => {
      const menuObj = menus.headerMenu.find((e) => e?.key === val[0]);
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
  );

  return {
    ...toRefs(menus),
    getMenus: _getMenus,
    setHeaderNav,
  };
});
