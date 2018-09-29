export interface IUserPermission {
  entitypath: string;
  entityname: string;
  displayname: string;
  entity: number;
  bitvalue: number;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  search: boolean;
  print: boolean;
  mail: boolean;
  settings: boolean;
}
