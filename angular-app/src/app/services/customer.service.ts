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
		let url = CONSTS.SERVICE_BASE_URL + '/tickets/' + userId;
		return this.http.get(CONSTS.SERVICE_BASE_URL + '/tickets/customer/',{params:{'customerid':userId}});
	}

	createTicket(datas) {
		console.log("INSIDE CREATE TICKET");
		let userId = this.tokenService.getUserInfo()._id;
		return this.http.post(`${CONSTS.SERVICE_BASE_URL}/tickets/`+userId,datas);
	}
}
