import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './master/client/client.component';
import { DashboardComponent } from './dashboard/oa-dashboard/oa-dashboard.component';
import { HomeComponent } from './home/home.component';
import { VehicleTrackingComponent } from './reports/vehicle-tracking/vehicle-tracking.component';
import { AuthGuard } from './services/admin/auth-guard.service';
import { RoleManagementComponent } from './auth/role-management/role-management.component';

import { UserManagementComponent } from './auth/user-management/user-management.component';
import { LoginResolve } from './services/admin/login-resolve.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { DocumentComponent } from './master/document/document.component';
import { DocumentReceivedComponent } from './report/document-received/document-received.component';
import { PendingTaskComponent } from './report/pending-task/pending-task.component';
import { DocumentSentComponent } from './report/document-sent/document-sent.component';
import { PaymentReceivedComponent } from './report/payment-received/payment-received.component';
import { PaymentPaidComponent } from './report/payment-paid/payment-paid.component';
import { PaymentPendingComponent } from './report/payment-pending/payment-pending.component';

const routes: Routes = [
  { path: '', component: UserAuthComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'master/client',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/document',
    component: DocumentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/document-received',
    component: DocumentReceivedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/pending-task',
    component: PendingTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/document-sent',
    component: DocumentSentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/payment-received',
    component: PaymentReceivedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/payment-paid',
    component: PaymentPaidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/payment-pending',
    component: PaymentPendingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/vehicle-tracking',
    component: VehicleTrackingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-role',
    component: RoleManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-user',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
