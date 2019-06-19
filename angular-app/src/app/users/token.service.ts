import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  @Output() refreshTopHeaderMenuEventEmitter: EventEmitter<any> = new EventEmitter();

  public emitTopHeaderMenuUpdatedEvent(parameters) {
    this.refreshTopHeaderMenuEventEmitter.emit(parameters);
  }

  public getRefreshTopHeaderMenuEventEmitter() {
     return this.refreshTopHeaderMenuEventEmitter;
  }

  fetch(){
    return localStorage.getItem("token");
  }

  persist(data: any) {
    localStorage.setItem("token", data);
    this.emitTopHeaderMenuUpdatedEvent(data);
  }

  delete()
  {
    localStorage.removeItem("token");
    this.emitTopHeaderMenuUpdatedEvent("token");

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
