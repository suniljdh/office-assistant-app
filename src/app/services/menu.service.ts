import { Injectable } from '@angular/core';
import { DataService } from '../utilities/data.service';
import { Observable } from 'rxjs';
import { IMenu } from '../model/i-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private data: DataService) {}

  FetchAllMenus(): Observable<IMenu[]> {
    const serviceMethod = '/fetchallmenus';
    return <Observable<IMenu[]>>this.data.getData(serviceMethod);
  }
}
