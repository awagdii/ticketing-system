import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http : HttpClient) { }

  saveUser(user)
  {
    return this.http.post('http://localhost:3000/users/',user.value);
  }

  login(data): Observable<any> {
    return this.http.post('http://localhost:3000/users/'+ "login", data);
  }

}
