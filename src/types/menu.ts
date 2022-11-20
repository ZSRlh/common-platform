export interface MenuReq {
  userName: string;
}

export interface MenuDataItem {
  key: string;
  title: string;
  icon?: string;
  level: number;
  isDir?: boolean;
  children?: MenuDataItem[];
};

export interface MenuRes {
  menu: MenuDataItem[];
  total: number;
}