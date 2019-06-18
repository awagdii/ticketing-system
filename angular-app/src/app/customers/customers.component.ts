import { Component, ɵConsole, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TokenService } from '../users/token.service';
import { log } from 'util';
import { async } from 'q';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-customer',
	template: `
		<div>
			<h3>Create new ticket</h3>
			<form [formGroup] = "customerCreateTicket" (ngSubmit) = "onSubmit()"> 
				<div> Title : <input name="title" formControlName="title" /></div>
				
				<div>Description : <textarea name="description" formControlName="description"> </textarea></div>
				<div> <button type="submit">Create</button></div>
			</form>
		</div>
		<br/>
		<h3>My Tickets</h3>
		<table>
		<tr>
		  <th>Title</th>
		  <th>Description</th>
		  <th>Status</th>
		  <th>Created At</th>
		  <th>Comments</th>
		</tr>
		<tr *ngFor="let ticket of history$ | async">
			<td>{{ticket.title}}</td>
			<td>{{ticket.description}}</td>
			<td>{{ticket.status}}</td>
			<td>{{ticket.createdAt|date : "MM/dd/yyyy"}}</td>
			<td>{{ticket.resolve_comments}}</td>
		</tr>
		<tr>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>32</td>
		</tr>
	  </table>
	`,
	styles: [`
		.createTicket {
			display: none;
		}
	`]
})
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

			},
			error => {
				console.log("error")
			}
		);
	}

}
