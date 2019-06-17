import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';


const myRoutes: Routes = [
	{ path : '', component: HomeComponent},
	{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
	{ path: 'employees', loadChildren: () => import('./employees/employees.module').then(e => e.EmployeesModule)}
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,HttpClientModule,RouterModule.forRoot(myRoutes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
