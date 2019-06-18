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

  getInProgressTickets(empid): Observable<any> {
    console.log('assignTicketToEmployee')
    console.log({ empid })
    let url = CONSTS.SERVICE_BASE_URL + '/tickets/inprogress';
    return this.http.get(url, empid);
  }
  assignTicketToCurrentEmployee(ticketid, empid): Promise<any> {
    console.log('assignTicketToEmployee')

    console.log({ ticketid, empid })
    // console.log(user);

    let url = CONSTS.SERVICE_BASE_URL + '/tickets/assign';
    return this.http.patch(url, { ticketid, empid }).toPromise();
  }
  resolveCurrentEmployeeTicket(ticketid, comment): Promise<any> {
    console.log('resolveCurrentEmployeeTicket');
    let url = CONSTS.SERVICE_BASE_URL + '/tickets/resolve';
    return this.http.patch(url, { ticketid, comment }).toPromise();
  }
}
