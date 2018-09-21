import { Component } from '@angular/core';
import { PermissionService } from '../../services/admin/permission.service';
import { Subscription } from 'rxjs';
import { IPermission } from '../../model/i-permission';
import { IMessage } from '../../model/i-message';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'oa-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent {
  rolename: string;
  msg: IMessage;
  displayedColumns = [
    'display',
    'view',
    'add',
    'edit',
    'delete',
    'search',
    'print',
    'mail',
    'settings'
  ];

  dataSource: IPermission[];
  permissionSubscription: Subscription;
  constructor(
    private permissionService: PermissionService,
    private snackBar: MatSnackBar
  ) {
    this.permissionSubscription = this.permissionService
      .FetchAllPermissions()
      .subscribe((resp: IPermission[]) => {
        this.dataSource = resp;
        // console.log(this.dataSource);
      });
  }

  SavePermission() {
    const data = this.dataSource.filter(f => {
      return (
        f.is_root === false &&
        (f.view === true ||
          f.add === true ||
          f.edit === true ||
          f.delete === true ||
          f.search === true ||
          f.print === true ||
          f.mail === true ||
          f.settings === true)
      );
    });

    if (
      this.rolename !== undefined &&
      data !== undefined &&
      (this.rolename.length >= 3 && data.length > 0)
    ) {
      console.log(data);
      data[0].rolename = this.rolename;
      this.permissionSubscription = this.permissionService
        .SavePermission(data)
        .subscribe((resp: IMessage) => {
          this.msg = resp;
          console.log(this.msg);
          if (this.msg) {
            this.snackBar.open(this.msg.returnmsg, '', {
              duration: 2000
            });

            if (this.msg.returncode === 'R1') {
              this.permissionSubscription = this.permissionService
                .FetchAllPermissions()
                .subscribe((r: IPermission[]) => {
                  this.dataSource = r;
                  this.rolename = '';
                  // console.log(this.dataSource);
                });
            }
          }
        });
    } else {
      console.log('Error...');
      if (data.length === 0) {
        this.snackBar.open('Select atleast one permission.', '', {
          duration: 2000
        });
      } else if (this.rolename === undefined || this.rolename.length < 3) {
        this.snackBar.open('Provide role name', '', {
          duration: 2000
        });
      } else {
        this.snackBar.open('Failed to save.', '', { duration: 2000 });
      }
    }
  }
}
