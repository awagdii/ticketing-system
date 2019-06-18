import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { EmployeeTicketsComponent } from './employee-tickets/employee-tickets.component';
import { EmployeeService } from './employee.service';

@NgModule({
  declarations: [EmployeesComponent, EmployeeTicketsComponent],
  imports: [
    MaterialModule,

    CommonModule,
    RouterModule.forChild([
      { path: '', component: EmployeesComponent },
      { path: 'tickets', component: EmployeeTicketsComponent }]),
  ],
  providers:[EmployeeService]
})
export class EmployeesModule { }
