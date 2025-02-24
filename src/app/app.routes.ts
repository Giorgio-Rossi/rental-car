import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ManageRequestsComponent } from './components/manage-requests/manage-requests.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddRequestUserComponent } from './components/add-request-user/add-request-user.component';
import { ManageCarsComponent } from './components/manage-cars/manage-cars.component';
import { FormViewEditCarComponent } from './components/form-view-edit-car/form-view-edit-car.component';

export const  routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage-requests', component: ManageRequestsComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'new-request', component: AddRequestUserComponent },
  { path: 'manage-cars', component: ManageCarsComponent },
  { path: 'edit-cars/:id', component: FormViewEditCarComponent }

];