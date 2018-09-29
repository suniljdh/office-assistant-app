import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPermission } from '../../model/i-permission';
import { DataService } from '../../utilities/data.service';
import { IMenu } from '../../model/i-menu';
import { IMessage } from '../../model/i-message';
import { IUserPermission } from '../../model/i-user-permission';
import { IActionConfig } from '../../model/i-action-config';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private data: DataService) {}

  FetchAllPermissions(): Observable<IPermission[]> {
    const serviceMethod = '/fetchallpermissions';
    return <Observable<IPermission[]>>this.data.getData(serviceMethod);
  }

  SavePermission(data): Observable<IMessage> {
    const serviceMethod = '/savepermission';
    return <Observable<IMessage>>this.data.postData(serviceMethod, data);
  }

  FetchAllRoles(): Observable<any> {
    const serviceMethod = '/fetchallroles';
    return <Observable<any>>this.data.getData(serviceMethod);
  }

  SaveUser(data): Observable<IMessage> {
    const serviceMethod = '/savenewuser';
    return <Observable<IMessage>>this.data.postData(serviceMethod, data);
  }
  FetchUserPermissions(loginid: string): Observable<IUserPermission[]> {
    const serviceMethod = '/userpermissions?loginid=' + loginid;
    return <Observable<IUserPermission[]>>this.data.getData(serviceMethod);
  }
  FetchEntityPermissions(data: any): Observable<IActionConfig> {
    const serviceMethod = '/entitypermissions';
    return <Observable<IActionConfig>>this.data.postData(serviceMethod, data);
  }
}
