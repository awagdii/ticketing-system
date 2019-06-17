import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTS } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private http: HttpClient) { }

	getCurrentUser() {
		let currentUser = localStorage.getItem('currentUser');
		if (currentUser)
			return JSON.parse(localStorage.getItem('currentUser'));
		return currentUser;
	}

	getHistory(): Observable<any> {
		console.log('inside history');
		let url = CONSTS.SERVICE_BASE_URL + '/history';
		return this.http.get(url);
	}
}
