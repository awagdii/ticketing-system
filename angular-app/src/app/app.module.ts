import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthguardGuard } from './authguard.guard';


const myRoutes: Routes = [
	{ path : '', component: HomeComponent},
  { path: 'customers', loadChildren: () => import('./customers/customers.module')
  .then(m => m.CustomersModule)}, //toapply guar add: ,canActivate: [AuthguardGuard]
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(e => e.EmployeesModule)},
  { path: 'users', loadChildren: () => import('./users/users.module').then(e => e.UsersModule)},
	{ path: 'error', component:ErrorComponent}
  
  
];

@NgModule({
	declarations: [
		AppComponent,
    HomeComponent,
    ErrorComponent
	
	],
	imports: [
		BrowserModule,RouterModule.forRoot(myRoutes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
