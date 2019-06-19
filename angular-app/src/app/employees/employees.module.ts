import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { EmployeeTicketsComponent } from './employee-tickets/employee-tickets.component';
import { EmployeeService } from './employee.service';
import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';

@NgModule({
  declarations: [EmployeesComponent, EmployeeTicketsComponent, ResolvedTicketsComponent],
  imports: [
    MaterialModule,

    CommonModule,
    RouterModule.forChild([
      { path: '', component: EmployeesComponent },
      { path: 'resolved', component: ResolvedTicketsComponent },
      { path: 'tickets', component: EmployeeTicketsComponent }]),
  ],
  providers:[EmployeeService]
})
export class EmployeesModule { }
