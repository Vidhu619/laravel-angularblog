import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './guards/auth-guard';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { UserDashboardComponent } from './user/dashboard/dashboard';

export const routes: Routes = [
   
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthGuard] }




];
