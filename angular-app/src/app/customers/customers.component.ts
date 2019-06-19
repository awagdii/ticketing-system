import { Component, ɵConsole, OnInit, ViewChild } from '@angular/core';
import { TokenService } from '../users/token.service';
import { log } from 'util';
import { async } from 'q';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { CustomerService } from './customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
	selector: 'app-customer',
	template: `
		<div id="container">
			<div>
				<form class="createTicketForm" [formGroup] = "customerCreateTicket" (ngSubmit) = "onSubmit()">
					<mat-card>
					<mat-card-title> Create new ticket </mat-card-title>
						<mat-form-field class="formFields">
							<input matInput name="title" formControlName="title" placeholder="Title" />
						</mat-form-field>
						<mat-divider></mat-divider>
						<mat-form-field>
							<textarea matInput name="description" formControlName="description" placeholder="Description"> </textarea>
						</mat-form-field>
						<div> <button mat-stroked-button type="submit">Create</button></div>
					</mat-card>
				</form>	
			</div>
			<br/>
		</div>

		<div class="mat-elevation-z8">
	</div>
	`,
	styles: [`
		#container {
			margin-top: 10px;
		}
		table {
			width: 100%;
		}
		.createTicketForm {
			min-width: 150px;
			max-width: 500px;
			width: 100%;
		}
		.formFields {
			width: 100%;
		}
	`]
})


// <table mat-table>
// 				<tr mat-header-row class="header-row wrapper"> 
// 					<td class="text" width="150px"> Title </td>
// 					<td class="text" width="200px"> Description </td>
// 					<td class="text" width="75px"> Status </td>
// 					<td class="text" width="120px"> Created at </td>
// 					<td class="text" width="200px"> Resolved </td>
// 				</tr>
// 				<tr class="field-row wrapper" *ngFor="let ticket of history$ | async">
// 					<td class="text" width="150px">{{ticket.title}}</td>
// 					<td class="text" width="200px">{{ticket.description}}</td>
// 					<td class="text" width="75px">{{ticket.status}}</td>
// 					<td class="text" width="120px">{{ticket.createdAt|date : "MM/dd/yyyy"}}</td>
// 					<td class="text" width="200px">{{ticket.resolve_comments}}</td>
// 				</tr>
// 			</table>
export class CustomersComponent implements OnInit {
	public history: any
	dataSource = new MatTableDataSource<HistoryTicket>(this.history);
	customerCreateTicket: FormGroup
	displayedColumns: string[] = ['title', 'description', 'status', 'createdAt'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private service: CustomerService, private tokenService: TokenService, private fBuilder: FormBuilder) {
		// this.history$ = this.service.getHistory();
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
		this.customerCreateTicket = this.fBuilder.group({
			description: '',
			title: ''
		});
		this.dataSource.paginator = this.paginator;
	}

	onSubmit() {
		this.service.createTicket(this.customerCreateTicket.value).subscribe(
			result => {
				this.customerCreateTicket.reset();
				this.history = this.service.getHistory();
			},
			error => {
				console.log("error")
			}
		);
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
