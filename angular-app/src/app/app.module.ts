import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


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
		BrowserModule,RouterModule.forRoot(myRoutes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
