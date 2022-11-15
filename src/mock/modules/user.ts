import type { MockMethod } from 'vite-plugin-mock';
export const genMenu = ():Array<Object> => {
  return [
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
  ]
}

export default [
  {
    url: '/menu',
    timeout: 0,
    method: 'get',
    response: () => {
      return genMenu();
    },
  }
] as MockMethod[];
