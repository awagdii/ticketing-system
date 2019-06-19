import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TokenService } from 'src/app/users/token.service';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customer-tickets',
  templateUrl: './customer-tickets.component.html',
  styleUrls: ['./customer-tickets.component.css']
})
export class CustomerTicketsComponent implements OnInit {

	public history: any
	dataSource = new MatTableDataSource<HistoryTicket>(this.history);
	displayedColumns: string[] = ['title', 'description', 'status', 'createdAt'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private service: CustomerService, private tokenService: TokenService, private fBuilder: FormBuilder) {
		this.history = new Array();
		this.service.getHistory().subscribe(
			res => {
				// this.openTickets.push(res);
				this.history = this.history.concat(res);
				this.dataSource = new MatTableDataSource<HistoryTicket>(this.history);
				this.dataSource.paginator = this.paginator;
			},
			err => {
				console.log(err);
			}
		);
	}

	createTicket(): void {

	}

	onCreate(): void {
		// this.service.createTicket();
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
	}

	



}
export interface HistoryTicket {
	_id: string;
	title: string;
	description: string;
	user_name: string;
	status: string;
	createdAt: string;
	created_by: Object;
}