import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './/app-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/oa-dashboard/oa-dashboard.component';

import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './master/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { VehicleTrackingComponent } from './reports/vehicle-tracking/vehicle-tracking.component';
import { TokenInterceptor } from './services/admin/token-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { UserManagementComponent } from './auth/user-management/user-management.component';
import { tokenGetter } from './utilities/common/token-actions';
import { LogInPopupComponent } from './auth/user-auth/log-in-popup/log-in-popup.component';
import { RoleManagementComponent } from './auth/role-management/role-management.component';
import { TabletemplateComponent } from './tabletemplate/tabletemplate.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { DocumentComponent } from './master/document/document.component';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { DocumentReceivedComponent } from './report/document-received/document-received.component';
import { PendingTaskComponent } from './report/pending-task/pending-task.component';
import { DocumentSentComponent } from './report/document-sent/document-sent.component';
import { PaymentReceivedComponent } from './report/payment-received/payment-received.component';
import { PaymentPaidComponent } from './report/payment-paid/payment-paid.component';
import { PaymentPendingComponent } from './report/payment-pending/payment-pending.component';

@NgModule({
  declarations: [
    // AppComponent,
    DashboardComponent,
    HomeComponent,
    ClientComponent,
    VehicleTrackingComponent,
    UserManagementComponent,
    LogInPopupComponent,
    RoleManagementComponent,
    TabletemplateComponent,
    NotFoundComponent,
    EmployeeComponent,
    DocumentComponent,
    UserAuthComponent,
    DocumentReceivedComponent,
    PendingTaskComponent,
    DocumentSentComponent,
    PaymentReceivedComponent,
    PaymentPaidComponent,
    PaymentPendingComponent
  ],
  entryComponents: [LogInPopupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
        // blacklistedRoutes: ['localhost:4200/auth/']
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TextMaskModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [HomeComponent]
})
export class AppModule {}
