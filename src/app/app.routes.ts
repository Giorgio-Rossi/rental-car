import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ManageRequestsComponent } from './components/manage-requests/manage-requests.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddRequestUserComponent } from './components/add-request-user/add-request-user.component';

export const  routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage-requests', component: ManageRequestsComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'new-request', component: AddRequestUserComponent }

];