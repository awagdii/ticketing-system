import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTS } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../users/token.service';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private http: HttpClient, private tokenService : TokenService) { }

	getHistory(): Observable<any> {
		let userId = this.tokenService.getUserInfo()._id;
		return this.http.get(CONSTS.SERVICE_BASE_URL + `/tickets/customer/${userId}`);
	}

	createTicket(data) {
		let userInfo = this.tokenService.getUserInfo();
		userInfo.ticketInfo = data;
		return this.http.post(`${CONSTS.SERVICE_BASE_URL}/tickets/`,userInfo);
	}
}
