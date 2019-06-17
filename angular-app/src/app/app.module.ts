import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const myRoutes: Routes = [
	{ path : '', component: AppComponent},
	{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
	{ path: 'employees', loadChildren: () => import('./employees/employees.module').then(e => e.EmployeesModule)}
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,RouterModule.forRoot(myRoutes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
