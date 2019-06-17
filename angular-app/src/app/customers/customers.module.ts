import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AuthguardGuard } from '../authguard.guard';

const myRoutes: Routes = [{ path: '', component: CustomersComponent },
	{ path: 'customers', component: CustomersComponent},
	{path:'**',redirectTo:''}
]

@NgModule({
	declarations: [
		CustomersComponent
	],
	imports: [
		CommonModule, RouterModule.forChild(myRoutes)
	]
})
export class CustomersModule { }
