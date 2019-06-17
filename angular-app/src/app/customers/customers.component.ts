import { Component, ɵConsole } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
	selector: 'app-customer',
	template: `
		<div>

		</div>
	`,
	styles: []
})
export class CustomersComponent {
	customerComeOn = 'i am customer'
	currentUser : any = ''
	history = []

	constructor(private service: CustomerService) {
		this.service.getHistory().subscribe(
			res => {
				// this.openTickets.push(res);
				this.history = this.history.concat(res);
				console.log(res);
			},
			err => {
				console.log(err);
			}
		);
		console.log(history);

		this.currentUser = service.getCurrentUser
	}
}
