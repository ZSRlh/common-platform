import service from '@/assets/axios';
import type { MenuReq, MenuRes } from '@/types/menu';

export const getMenus = ({ userName }: MenuReq): Promise<MenuRes> => {
  return service<MenuReq, MenuRes>({
    url: '/menu',
    method: 'get',
    data: { userName },
  });
}