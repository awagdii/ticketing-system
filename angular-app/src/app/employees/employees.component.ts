import { EmployeeService } from '../services/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '../users/token.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})


export class EmployeesComponent implements OnInit {

  public openTickets = new Array();

  displayedColumns: string[] = ['title', 'description', 'user_name', 'status', 'createdAt', 'assign'];
  dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private myHttp: EmployeeService, private tokenService: TokenService) {
    console.log('in constructor');

    this.myHttp.getOpenTickets().subscribe(
      res => {
        // this.openTickets.push(res);
        this.openTickets = this.openTickets.concat(res);
        this.dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
        this.dataSource.paginator = this.paginator;

        console.log(res);
      },
      err => {
        console.log(err);
      }
    );


  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  assingTicket(ticketid) {
    let id =this.tokenService.getUserInfo()._id;
    this.myHttp.assignTicketToCurrentEmployee(ticketid,id);
  }

}


export interface TicketElement {
  _id: string;
  title: string;
  description: string;
  user_name: string;
  status: string;
  createdAt: string;
}


