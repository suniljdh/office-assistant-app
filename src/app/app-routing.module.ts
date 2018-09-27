import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './master/client/client.component';
import { DashboardComponent } from './dashboard/oa-dashboard/oa-dashboard.component';
import { HomeComponent } from './home/home.component';
import { VehicleTrackingComponent } from './reports/vehicle-tracking/vehicle-tracking.component';
import { AuthGuard } from './services/admin/auth-guard.service';
import { RoleManagementComponent } from './auth/role-management/role-management.component';
import { RmComponent } from './master/rm/rm.component';
import { UserManagementComponent } from './auth/user-management/user-management.component';
import { LoginResolve } from './services/admin/login-resolve.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';

const routes: Routes = [
  { path: '', component: UserAuthComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'master/client',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  { path: 'master/rm', component: RmComponent, canActivate: [AuthGuard] },
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
