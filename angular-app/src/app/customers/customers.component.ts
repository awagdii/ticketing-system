import { Component, ɵConsole, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TokenService } from '../users/token.service';
import { log } from 'util';
import { async } from 'q';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MaterialModule } from '../material-module';

@Component({
	selector: 'app-customer',
	template: `
		<div id="container">
			<div>
				<h3>Create new ticket</h3>
				<form [formGroup] = "customerCreateTicket" (ngSubmit) = "onSubmit()"> 
					<div> Title : <input name="title" formControlName="title" /></div>
					
					<div>Description : <textarea name="description" formControlName="description"> </textarea></div>
					<div> <button type="submit">Create</button></div>
				</form>
			</div>
			<br/>
			<div> </div>
			<div class="ticketHistory">
			<table mat-table>
				<ng-container matColumnDef="header" class="header-row wrapper"> 
					<td class="text" width="150px" mat-header-cell> Title </td>
					<td class="text" width="200px"> Description </td>
					<td class="text" width="75px"> Status </td>
					<td class="text" width="120px"> Created at </td>
					<td class="text" width="200px"> Resolved </td>
				</ng-container>
				<tr class="field-row wrapper" *ngFor="let ticket of history$ | async">
					<td class="text" width="150px">{{ticket.title}}</td>
					<td class="text" width="200px">{{ticket.description}}</td>
					<td class="text" width="75px">{{ticket.status}}</td>
					<td class="text" width="120px">{{ticket.createdAt|date : "MM/dd/yyyy"}}</td>
					<td class="text" width="200px">{{ticket.resolve_comments}}</td>
				</tr>
			</table>
			</div>
		</div>
	`,
	styles:[`
		table td {
			text-align : center;
		}
	`]
})


// <h3>My Tickets</h3>
// <table>
// <tr>
//   <th>Title</th>
//   <th>Description</th>
//   <th>Status</th>
//   <th>Created At</th>
//   <th>Comments</th>
// </tr>
// <tr *ngFor="let ticket of history$ | async">
// 	<td>{{ticket.title}}</td>
// 	<td>{{ticket.description}}</td>
// 	<td>{{ticket.status}}</td>
// 	<td>{{ticket.createdAt|date : "MM/dd/yyyy"}}</td>
// 	<td>{{ticket.resolve_comments}}</td>
// </tr>
// <tr>
// 	<td>123</td>
// 	<td>123</td>
// 	<td>123</td>
// 	<td>123</td>
// 	<td>32</td>
// </tr>
// </table>
export class CustomersComponent implements OnInit {
	currentUser: any = ''
	history$: any
	customerCreateTicket: FormGroup

	constructor(private service: CustomerService, private tokenService: TokenService, private fBuilder: FormBuilder) {
		this.history$ = this.service.getHistory();
		this.currentUser = tokenService.getUserInfo()._id;
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
	}

	onSubmit() {
		this.service.createTicket(this.customerCreateTicket.value).subscribe(
			result => {
				this.customerCreateTicket.reset();
			},
			error => {
				console.log("error")
			}
		);
	}

}
