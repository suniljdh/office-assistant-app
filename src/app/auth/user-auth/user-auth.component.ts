import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IUserData } from '../../model/i-user-data';
import { LogInPopupComponent } from './log-in-popup/log-in-popup.component';

@Component({
  selector: 'oa-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  constructor(private dialog: MatDialog) {
    const dialogRef = this.dialog.open(LogInPopupComponent, {
      disableClose: true,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((result: IUserData) => {
      if (result === undefined || result === null) {
        return;
      }
    });
  }

  ngOnInit() {}
}
