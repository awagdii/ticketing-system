import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketElement } from '../employees.component';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { TokenService } from 'src/app/users/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {
  public inProgressTickets;

  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'resolve_comment'];
  dataSource = new MatTableDataSource<TicketElement>(this.inProgressTickets);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private myHttp: EmployeeService, private tokenService: TokenService, private toastr: ToastrService) {
    this.getResolvedTickets();



  }

  getResolvedTickets() {
    this.inProgressTickets = new Array();
    this.myHttp.getResolvedTickets(this.tokenService.getUserInfo()._id).subscribe(
      res => {
        this.inProgressTickets = this.inProgressTickets.concat(res);
        this.dataSource = new MatTableDataSource<TicketElement>(this.inProgressTickets);
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
}

