import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatRow,
  MatRowDef,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from '@angular/material';
import { ClientService } from '../../services/client.service';
import { IMessage } from '../../model/i-message';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  FormControlDirective,
  FormGroupDirective,
  FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IClientType } from '../../model/i-client-type';
import { MessageService } from '../../services/message.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IClient } from '../../model/i-client';
import { IFilter } from '../../model/i-filter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_FORMATS } from '../../utilities/common/custom-date-format';
import * as _moment from 'moment';
import { IDocumentType } from '../../model/i-document-type';
import { IActionConfig } from '../../model/i-action-config';
import { PermissionService } from '../../services/admin/permission.service';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

@Component({
  selector: 'oa-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS }
  ]
})
export class ClientComponent implements OnInit, OnDestroy {
  moment = _moment;
  actionSetting: IActionConfig;
  // clienttype_id: Number = -1;
  msg: IMessage;
  frmClient: FormGroup;
  clientSubscription: Subscription;
  clienttypeSubscription: Subscription;
  ClientTypes: IClientType[];
  ClientData: IClient;
  TableData: IClient[];
  // client_id = 0;
  keepCharPositions: true;
  SearchMode = false;
  displayedColumns: string[];

  filterItems: IFilter[] = [
    { id: 1, filter: 'clientid', displayFilter: 'Client ID' },
    { id: 2, filter: 'clienttypeid', displayFilter: 'Client Type' },
    { id: 3, filter: 'firstname', displayFilter: 'First Name' },
    { id: 4, filter: 'middlename', displayFilter: 'Middle Name' },
    { id: 5, filter: 'lastname', displayFilter: 'Last Name' },
    { id: 6, filter: 'companyname', displayFilter: 'Company Name' },
    { id: 7, filter: 'dob', displayFilter: 'Date of Birth' },
    { id: 8, filter: 'panno', displayFilter: 'PAN No.' },
    { id: 9, filter: 'aadharno', displayFilter: 'Aadhar No.' },
    { id: 10, filter: 'gstno', displayFilter: 'GSTN' }
  ];
  selectedColumn = 'firstname';

  documentList: IDocumentType[] = [
    { id: 1, document: 'PAN' },
    { id: 2, document: 'PASSPORT' },
    { id: 3, document: 'GST RETURN' },
    { id: 4, document: 'VOTER ID' },
    { id: 5, document: 'IT RETURN' }
  ];

  dataSource: MatTableDataSource<IClient>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  entityInfo: { loginid: string; entityref: number };
  constructor(
    private permissionService: PermissionService,
    private msgService: MessageService,
    private snackBar: MatSnackBar,
    private clientService: ClientService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.frmClient = fb.group({
      clientid: fb.control(0, Validators.compose([Validators.required])),
      clienttypeid: fb.control(null, Validators.compose([Validators.required])),
      firstname: fb.control(null, Validators.compose([Validators.required])),
      middlename: fb.control(null, Validators.compose([Validators.required])),
      lastname: fb.control(null, Validators.compose([Validators.required])),
      companyname: fb.control(null, Validators.compose([Validators.required])),
      dob: fb.control(this.moment, Validators.compose([Validators.required])),
      panno: fb.control(null, Validators.compose([Validators.required])),
      aadharno: fb.control(null, Validators.compose([Validators.required])),
      gstno: fb.control(null, Validators.compose([Validators.required])),
      // documents: fb.array([this.createItem()])
      documents: fb.group({ document: fb.array([this.createItem()]) })
    });

    this.displayedColumns = [];
    this.filterItems.forEach((el: IFilter) => {
      this.displayedColumns.push(el.filter);
    });

    this.entityInfo = { loginid: 'hardik', entityref: 2 };

    this.permissionService
      .FetchEntityPermissions(this.entityInfo)
      .subscribe((resp: IActionConfig) => {
        this.actionSetting = resp;
        console.log(this.actionSetting);
      });
  }

  get ClientId(): FormControl {
    return this.frmClient.get('clientid') as FormControl;
  }
  get ClientTypeId(): FormControl {
    return this.frmClient.get('clienttypeid') as FormControl;
  }
  get FirstName(): FormControl {
    return this.frmClient.get('firstname') as FormControl;
  }
  get MiddleName(): FormControl {
    return this.frmClient.get('middlename') as FormControl;
  }

  get LastName(): FormControl {
    return this.frmClient.get('lastname') as FormControl;
  }

  get CompanyName(): FormControl {
    return this.frmClient.get('companyname') as FormControl;
  }

  get DOB(): FormControl {
    return this.frmClient.get('dob') as FormControl;
  }

  get PANNO(): FormControl {
    return this.frmClient.get('panno') as FormControl;
  }

  get AADHARNO(): FormControl {
    return this.frmClient.get('aadharno') as FormControl;
  }

  get GSTNO(): FormControl {
    return this.frmClient.get('gstno') as FormControl;
  }

  get DOCUMENT(): FormGroup {
    return this.frmClient.get('documents') as FormGroup;
  }

  ngOnInit() {
    this.GetClientType();
  }

  ngOnDestroy() {
    if (
      this.clienttypeSubscription !== null &&
      this.clienttypeSubscription !== undefined
    ) {
      this.clienttypeSubscription.unsubscribe();
    }

    if (
      this.clientSubscription !== null &&
      this.clientSubscription !== undefined
    ) {
      this.clientSubscription.unsubscribe();
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      documentname: this.fb.control(null, Validators.required),
      mandatory: this.fb.control(null, Validators.required),
      submissiondate: this.fb.control(this.moment, Validators.required)
    });
  }

  addItem() {
    const doc = this.DOCUMENT.get('document') as FormArray;
    doc.push(this.createItem());
  }

  removeItem(i: number) {
    console.log('Item Index : ', i);
    const doc = this.DOCUMENT.get('document') as FormArray;
    doc.removeAt(i);
  }

  GetClientType() {
    this.clienttypeSubscription = this.clientService
      .FetchClientType()
      .subscribe((data: any) => {
        // console.log(data)
        this.ClientTypes = data;
      });
  }

  SubmitClient(frm: FormGroupDirective) {
    if (frm.valid) {
      console.log(this.frmClient.value);
      this.clientSubscription = this.clientService
        .SaveClientData(this.frmClient.value)
        .subscribe((resp: IMessage) => {
          console.log(resp);
          this.msg = resp;
          this.ClientId.setValue(this.msg.context);
          if (this.msg.returncode.length > 0) {
            this.snackBar.open(this.msg.returnmsg, '', {
              duration: 2000
            });
            frm.resetForm();
            this.frmClient.reset();
          } else {
            this.snackBar.open('Failed to save data', '', {
              duration: 2000
            });
          }
        });
    }
  }

  FetchClientData(mode?: string) {
    const _clientid = this.ClientId.value;
    console.log(_clientid);
    this.clientSubscription = this.clientService
      .FetchClientData(_clientid, mode)
      .subscribe((resp: IClient) => {
        this.ClientData = resp;
        this.ClientId.setValue(this.ClientData.clientid);
        this.ClientTypeId.setValue(this.ClientData.clienttypeid);
        this.FirstName.setValue(this.ClientData.firstname);
        this.MiddleName.setValue(this.ClientData.middlename);
        this.LastName.setValue(this.ClientData.lastname);
        this.CompanyName.setValue(this.ClientData.companyname);
        this.DOB.setValue(this.ClientData.dob);
        this.PANNO.setValue(this.ClientData.panno);
        this.AADHARNO.setValue(this.ClientData.aadharno);
        this.GSTNO.setValue(this.ClientData.gstno);
        if (_clientid === this.ClientData.clientid && mode !== 'a') {
          let _msg = '';
          if (mode === 'p') {
            _msg = 'Reached at first record.';
          } else if (mode === 'n') {
            _msg = 'Reached at last record.';
          }
          this.snackBar.open(_msg, '', {
            duration: 2000
          });
        }
      });
  }

  DeleteClientData(frm: FormGroupDirective) {
    const _clientid = this.ClientId.value;
    if (_clientid > 0) {
      this.clientSubscription = this.clientService
        .DeleteClientData(_clientid)
        .subscribe((resp: IMessage) => {
          this.msg = resp;
          if (this.msg.returncode.length > 0) {
            this.snackBar.open(this.msg.returnmsg, '', {
              duration: 2000
            });
            this.ClientId.setValue(0);
            frm.resetForm();
            this.frmClient.reset();
          } else {
            this.snackBar.open('Failed to save data', '', {
              duration: 2000
            });
          }
        });
    }
  }

  FetchAllClients() {
    this.clientSubscription = this.clientService
      .FetchAllClients()
      .subscribe((resp: IClient[]) => {
        this.TableData = resp;
        // console.log(this.TableData);
        this.dataSource = new MatTableDataSource(this.TableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue) {
    // console.log(this.filterValue);
    switch (this.selectedColumn) {
      case 'clientid':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.clientid
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'clienttypeid':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.clienttypeid
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'firstname':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.firstname
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'middlename':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.middlename
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'lastname':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.lastname
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'companyname':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.companyname
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'dob':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.dob
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'panno':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.panno
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'aadharno':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.aadharno
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
      case 'gstno':
        this.dataSource.filterPredicate = (data: IClient, filterVal: string) =>
          data.gstno
            .trim()
            .toLowerCase()
            .indexOf(filterVal) !== -1;
        break;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetClient(row) {
    // console.log(row);
    this.SetSearchMode(false);
    this.ClientId.setValue(row.clientid);
    this.FetchClientData('a');
  }

  SetSearchMode(value: boolean) {
    this.SearchMode = value;
    // console.log(this.SearchMode);
    this.FetchAllClients();
  }
  getErrorMessage(c: string) {
    switch (c) {
      case 'FirstName':
        return 'First Name is Required';
      case 'MiddleName':
        return 'Middle Name is Required';
      case 'LastName':
        return 'Last Name is Required';
      case 'CompanyName':
        return 'Company Name is Required';
      case 'PANNO':
        return 'Pan No. is Required';
      case 'AADHARNO':
        return 'Aadhar No. is Required';
      case 'GSTNO':
        return 'GST No. is Required';
    }
    // if (c.hasError('required')) {
    //   return 'First Name is Required.';
    // }
  }

  openDialog(m: string): void {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   width: '350px',
    //   height: '120px',
    //   data: { message: m }
    // });
  }
}
