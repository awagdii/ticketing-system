import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketElement } from '../employees.component';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { TokenService } from 'src/app/users/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-tickets',
  templateUrl: './employee-tickets.component.html',
  styleUrls: ['./employee-tickets.component.css']
})
export class EmployeeTicketsComponent implements OnInit {

  public openTickets = new Array();

  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'resolve_comment'];
  dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private myHttp: EmployeeService, private tokenService: TokenService, private toastr: ToastrService) {

    this.myHttp.getInProgressTickets(this.tokenService.getUserInfo()._id).subscribe(
      res => {
        this.openTickets = this.openTickets.concat(res);
        this.dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );


  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  async resolveTicket(ticketid, comment) {
    let res = await this.myHttp.resolveCurrentEmployeeTicket(ticketid, comment);
    if (res.success) {
      this.toastr.success(res.success, 'Congratulations  ..!');
      this.openTickets = this.openTickets.filter(obj => {
        return obj._id !== ticketid;
      })
      this.dataSource = new MatTableDataSource<TicketElement>(this.openTickets);
      this.dataSource.paginator = this.paginator;
    } else {
      this.toastr.error(res.error, 'Failed  ..!');

    }
  }

}

