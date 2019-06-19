import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthguardGuard } from './authguard.guard';
import { TokenInterceptor } from './users/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
// import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeService } from './employees/employee.service';
import { CustomerService } from './customers/customer.service';
import { HeaderComponent } from './header/header.component';


const myRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'customers', loadChildren: () => import('./customers/customers.module')
			.then(m => m.CustomersModule),canActivate: [AuthguardGuard]
	}, //toapply guar add: 
  { path: 'employees', loadChildren: () => import('./employees/employees.module')
  .then(e => e.EmployeesModule) ,canActivate: [AuthguardGuard]},
	{ path: 'users', loadChildren: () => import('./users/users.module').then(e => e.UsersModule) },
	{ path: 'error', component: ErrorComponent }

];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ErrorComponent,
		HeaderComponent

	],
	imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
	RouterModule.forRoot(myRoutes),
	ToastrModule.forRoot(), // ToastrModule added

	],
	providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
    },
    EmployeeService,
    CustomerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
