import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTS } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private openTickets: string[] = [];
   url = CONSTS.SERVICE_BASE_URL + '/tickets/';

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
    return this.http.get(this.url);
  }

  getInProgressTickets(empid): Observable<any> {
    return this.http.get(this.url+`${empid}`);
  }
  getResolvedTickets(empid): Observable<any> {
    return this.http.get(this.url+'resolved/'+`${empid}`);
  }

  assignTicketToCurrentEmployee(ticketid, empid): Promise<any> {
    return this.http.patch(this.url+ `${empid}/${ticketid}`,{status:'in progress'}).toPromise();
  }

  resolveCurrentEmployeeTicket(ticketid, comment): Promise<any> {
    return this.http.patch(this.url+ `${ticketid}`, { comment }).toPromise();
  }
}
