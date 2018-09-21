export interface IMenu {
  id: number;
  menu: string;
  display: string;
  is_root: boolean;
  parent: number;
  view: number;
  add: number;
  edit: number;
  delete: number;
  search: number;
  print: number;
  mail: number;
  settings: number;
}
