import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '../users/token.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})


export class EmployeesComponent implements OnInit {

  public openTickets;

  displayedColumns: string[] = ['title', 'description', 'user_name', 'status', 'createdAt', 'assign'];
  dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private myHttp: EmployeeService, private tokenService: TokenService, private toastr: ToastrService) {
    console.log('in constructor');
    this.getOpenTickets();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  getOpenTickets() {
    this.openTickets = new Array();
    this.myHttp.getOpenTickets().subscribe(
      res => {
        // this.openTickets.push(res);
        this.openTickets = this.openTickets.concat(res);
        this.dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;

        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  async assingTicket(ticketid) {
    let curr_employee_id = this.tokenService.getUserInfo()._id;
    let res = await this.myHttp.assignTicketToCurrentEmployee(ticketid, curr_employee_id);
    // console.log(res)
    this.getOpenTickets();
    if (res.data) {
      this.toastr.success(res.data.success, 'Congratulations  ..!');

    } else {
      this.toastr.error(res.error, 'Failed  ..!');

    }
  }

}


export interface TicketElement {
  _id: string;
  title: string;
  description: string;
  user_name: string;
  status: string;
  comment: string;
  createdAt: string;
  created_by: Object;
}


