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
			<div *ngFor = "let ticket of (history$ | async)">
				<p> {{ticket.status}} </p>
				<p> {{ticket.created_by.role}} </p>
			</div>
			<button (click) = "createTicket()">Create new Ticket</button>
			<form [formGroup] = "customerCreateTicket" (ngSubmit) = "onSubmit()"> 
				Description : <textarea name="description" formControlName="description"> </textarea>
				<button type="submit">Create</button>
			</form>
		</div>
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
			description : [{value : ''}]
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
