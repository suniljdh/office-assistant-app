import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../../utilities/data.service';
import { IUserData } from '../../model/i-user-data';
import { IToken } from '../../model/i-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private data: DataService) {}

  Login(userdata: IUserData): Observable<IToken> {
    const serviceMethod = '/login';
    return this.data.postData(serviceMethod, userdata) as Observable<IToken>;
  }
}
