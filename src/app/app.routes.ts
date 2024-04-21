import { Routes } from '@angular/router';
import {SigninComponent} from "./views/signin/signin.component";
import {SignupComponent} from "./views/signup/signup.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];
