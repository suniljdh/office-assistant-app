import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IUserData } from '../../model/i-user-data';
import { LoginService } from './login.service';
import { IToken } from '../../model/i-token';

@Injectable({
  providedIn: 'root'
})
export class LoginResolve implements Resolve<IToken> {
  constructor(private loginService: LoginService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userData: IUserData = {
      loginid: route.paramMap.get('loginid'),
      password: route.paramMap.get('password')
    };
    return this.loginService.Login(userData);
  }
}
