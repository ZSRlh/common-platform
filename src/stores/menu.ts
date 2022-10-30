import { computed, reactive, ref, watch } from "vue";
import { defineStore } from 'pinia';

export interface MenuDataItem {
  key: string;
  title: string;
  icon?: string;
  level: number;
  isDir?: boolean;
  children?: MenuDataItem[];
}

export const useMenuStore = defineStore("menuStore", () => {
  const menus = reactive<MenuDataItem[]>([
    {
      key: 'nav1',
      title: '菜单1',
      level: 1,
      children: [
        {
          key: 'nav1/page1',
          title: '页面1',
          level: 2,
        },
        {
          key: 'nav1/page2',
          title: '页面2',
          level: 2,
        },
        {
          key: 'nav1/dir3',
          title: '目录3',
          level: 2,
          isDir: true,
          children: [
            {
              key: 'nav1/dir3/page3',
              title: '页面3',
              level: 3,
            },
            {
              key: 'nav1/dir3/page4',
              title: '页面4',
              level: 3,
            },
          ]
        },
      ]
    },
    {
      key: 'nav2',
      title: '菜单2',
      level: 1,
      children: [
        {
          key: 'nav2/page1',
          title: '页面1',
          level: 2,
        },
        {
          key: 'nav2/page2',
          title: '页面2',
          level: 2,
        },
      ]
    },
  ]);

  const getMenus = async () => {
    // 接口调用
    // menus = res.result
    // currentHeaderNav = menus[0].key
    // 后面要根据浏览器的url设置当前位置，避免刷新页面后重制nav
  };

  const currentHeaderNav = ref<String[]>([menus[0].key]);
  const setHeaderNav = (menuKey: String) => {
    currentHeaderNav.value = [menuKey];
   
  }

  const headerMenu = ref<MenuDataItem[]>(menus);
  const sideMenu = ref<MenuDataItem[]>(menus[0].children || []);
  watch(currentHeaderNav, (val) => {
    const menuObj = menus.find(e => e.key === val[0]);
    sideMenu.value = menuObj?.children ? menuObj.children : [];
  })

  return { headerMenu, sideMenu, getMenus, currentHeaderNav, setHeaderNav };
})