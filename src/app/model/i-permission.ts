import { IMenu } from './i-menu';

export interface IPermission {
  rolename?: string;
  id?: number;
  menu?: string;
  display?: string;
  is_root?: boolean;
  parent?: number;
  view?: boolean;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  search?: boolean;
  print?: boolean;
  mail?: boolean;
  settings?: boolean;
}
