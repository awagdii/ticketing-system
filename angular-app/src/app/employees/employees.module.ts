import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    MaterialModule,

    CommonModule,
    RouterModule.forChild([
      { path: '', component: EmployeesComponent }
    ]),
  ]
})
export class EmployeesModule { }
