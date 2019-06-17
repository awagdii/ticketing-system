import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTS } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private openTickets: string[] = [];

  constructor(public http: HttpClient) { }



  getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser)
      return JSON.parse(localStorage.getItem('currentUser'));
    return null;
  }

  // //setCurrentUser  just for testing will be removed
  // setCurrentUser() {
  //   let currentUser = localStorage.setItem('currentUser', JSON.stringify({ username: 'username' }));
  // }

  getOpenTickets(): Observable<any> {
    console.log('in getOpenTickets')
    let url = CONSTS.SERVICE_BASE_URL + '/tickets/opentickets';
    return this.http.get(url);
  }
}
