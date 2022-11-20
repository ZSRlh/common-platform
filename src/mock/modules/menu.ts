import type { MenuReq, MenuRes } from '@/types/menu';
import type { MockMethod } from 'vite-plugin-mock';
import { getReqDataByMethod, type MockReq } from '../utils';

export const genMenu = (req: MockReq<MenuReq>): MenuRes => {
  const nav1 = {
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
  };

  const nav2 = {
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
  };

  let list = [];
  let reqData = getReqDataByMethod<MenuReq>(req);
  if (reqData.userName === 'zsr') {
    list = [nav1, nav2];
  } else {
    list = [nav1];
  }
  return {
    menu: list,
    total: list.length,
  };
}

export default [
  {
    url: '/menu',
    timeout: 0,
    method: 'get',
    response: (req: MockReq<MenuReq>) => {
      return genMenu(req);
    },
  }
] as MockMethod[];
