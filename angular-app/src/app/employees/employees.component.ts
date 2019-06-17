import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public openTickets = new Array();

  constructor(private myHttp: EmployeeService) {
    console.log('in constructor');

    this.myHttp.getOpenTickets().subscribe(
      res => {
        // this.openTickets.push(res);
        this.openTickets = this.openTickets.concat(res);
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );


  }

  ngOnInit() {
  }

}
