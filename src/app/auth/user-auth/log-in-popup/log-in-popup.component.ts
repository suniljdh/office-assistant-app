import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/admin/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IToken } from '../../../model/i-token';
import { IUserData } from '../../../model/i-user-data';
import { tokenSetter } from '../../../utilities/common/token-actions';
import { AuthService } from '../../../services/admin/auth.service';

@Component({
  selector: 'oa-log-in-popup',
  templateUrl: './log-in-popup.component.html',
  styleUrls: ['./log-in-popup.component.scss']
})
export class LogInPopupComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  loginid: string;
  password: string;
  frmLogin: FormGroup;
  returnUrl: string;
  errMsg: string;
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: IUserData,
    private dialogRef: MatDialogRef<LogInPopupComponent>,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.LogOut();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // if (this.loginSubscription !== null || this.loginSubscription !== undefined) {
    //   this.loginSubscription.unsubscribe();
    // }
  }

  onLoginConfirm() {
    const userData: IUserData = {
      loginid: this.loginid,
      password: this.password
    };
    ///////////////////////
    this.loginService.Login(userData).subscribe(
      (token: IToken) => {
        if (token !== undefined || token.access_token !== '') {
          tokenSetter(token.access_token);
          this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || 'dashboard';

          this.router.navigate([this.returnUrl]);

          this.dialogRef.close(userData);
        }
      },
      error => (this.errMsg = error)
    );
  }

  clearform(frm: NgForm) {
    frm.reset();
    this.errMsg = null;
  }

  onKey(f: NgForm) {
    if (f.valid) {
      this.onLoginConfirm();
    }
  }
}
