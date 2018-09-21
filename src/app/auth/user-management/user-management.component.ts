import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { PermissionService } from '../../services/admin/permission.service';
import { Subscription } from 'rxjs';
import { IMessage } from '../../model/i-message';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'oa-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  frmUser: FormGroup;
  permissionSubscription: Subscription;
  roles: { id: number; role_name: string }[];
  msg: IMessage;
  value: string;
  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private snackBar: MatSnackBar
  ) {
    this.frmUser = fb.group({
      username: fb.control(
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      loginid: fb.control(
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
      password: fb.control(
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
      roleid: fb.control(null),
      isactive: fb.control(true)
    });
  }

  ngOnInit() {
    this.permissionSubscription = this.permissionService
      .FetchAllRoles()
      .subscribe(resp => {
        this.roles = resp;
        console.log(this.roles);
      });
  }

  SaveUser(f: FormGroupDirective) {
    this.permissionSubscription = this.permissionService
      .SaveUser(this.frmUser.value)
      .subscribe((resp: IMessage) => {
        console.log(resp);
        this.msg = resp;
        if (this.msg) {
          this.snackBar.open(this.msg.returnmsg, '', {
            duration: 2000
          });

          if (this.msg.returncode === 'R1') {
            this.frmUser.reset();
            f.reset();
          }
        }
      });
  }
}
