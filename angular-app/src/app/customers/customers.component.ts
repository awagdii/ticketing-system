import { Component, ɵConsole } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TokenService } from '../users/token.service';
import { log } from 'util';
import { async } from 'q';

@Component({
	selector: 'app-customer',
	template: `
		<div>
			<div *ngFor = "let ticket of (history$ | async)">
				<p> {{ticket.status}} </p>
				<p> {{ticket.created_by.role}} </p>
			</div>
			<button (click) = "createTicket()">Create new Ticket</button>
		</div>
	`,
	styles: []
})
export class CustomersComponent {
	currentUser : any = ''
	history$ : any

	constructor(private service: CustomerService, private tokenService : TokenService) {
		this.history$=this.service.getHistory();
		this.currentUser = tokenService.getUserInfo()._id;
	}

	createTicket() : void {
		// this.service.createTicket();
	}

}
