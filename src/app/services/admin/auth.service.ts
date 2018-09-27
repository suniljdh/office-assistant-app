import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter, removeToken } from '../../utilities/common/token-actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  public IsAuthenticated(): boolean {
    const token = tokenGetter();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public IsAdminUser(): boolean {
    const token = tokenGetter();
    return this.jwtHelper.decodeToken().isdmin;
  }

  public CurrentUser(): string {
    const token = tokenGetter();
    return this.jwtHelper.decodeToken().displayname;
  }

  public LogOut() {
    removeToken();
  }
}
