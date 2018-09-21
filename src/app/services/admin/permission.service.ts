import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPermission } from '../../model/i-permission';
import { DataService } from '../../utilities/data.service';
import { IMenu } from '../../model/i-menu';
import { IMessage } from '../../model/i-message';

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
}
