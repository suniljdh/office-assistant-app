import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthService } from '../../services/admin/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogInPopupComponent } from './log-in-popup/log-in-popup.component';
import { tokenSetter } from '../../utilities/common/token-actions';
import { IToken } from '../../model/i-token';
import { IUserData } from '../../model/i-user-data';
import { LoginService } from '../../services/admin/login.service';

@Component({
  selector: 'oa-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  returnUrl: string;
  tokenData: IToken;
  userData: IUserData;
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    dialog: MatDialog
  ) {
    this.authService.LogOut();

    const dialogRef = dialog.open(LogInPopupComponent, {
      disableClose: true,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((result: IUserData) => {
      if (result === undefined || result === null) {
        return;
      }
      this.loginService.Login(result).subscribe((token: IToken) => {
        if (token !== undefined || token.access_token !== '') {
          tokenSetter(token.access_token);
          this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || 'dashboard';

          this.router.navigate([this.returnUrl]);
        } else {
          this.authService.LogOut();
        }
      });
    });
  }

  ngOnInit() {}
}
