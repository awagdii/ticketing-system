import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  fetch(){
    return localStorage.getItem("token");
  }

  persist(data: any) {
    localStorage.setItem("token", data);
  }

  getUserInfo(){
    let token = this.fetch();
    console.log(token);
    if(!token) return null;
    let payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  }
  
  constructor() { }
}
