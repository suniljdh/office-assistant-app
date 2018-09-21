import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/admin/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IToken } from '../../../model/i-token';
import { IUserData } from '../../../model/i-user-data';

@Component({
  selector: 'oa-log-in-popup',
  templateUrl: './log-in-popup.component.html',
  styleUrls: ['./log-in-popup.component.scss']
})
export class LogInPopupComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  username: string;
  password: string;
  frmLogin: FormGroup;
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: IUserData,
    private dialogRef: MatDialogRef<LogInPopupComponent>,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    // if (this.loginSubscription !== null || this.loginSubscription !== undefined) {
    //   this.loginSubscription.unsubscribe();
    // }
  }

  onLoginConfirm() {
    const userData: IUserData = {
      username: this.username,
      password: this.password
    };
    this.dialogRef.close(userData);
  }

  onKey(f: NgForm) {
    if (f.valid) {
      this.onLoginConfirm();
  }
}}
