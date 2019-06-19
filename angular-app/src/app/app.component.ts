import { Component } from '@angular/core';
import { TokenService } from './users/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ticketing System';
  isEmployee=false;
  isCustomer=false;
  isLoggedIn=false;

  constructor(private tokenService: TokenService){

  }
  ngOnChange()
  {
    let user=this.tokenService.getUserInfo();
    if(user)
    {
      this.isEmployee=user.role=="employee";
      this.isCustomer=user.role=="customer";
      this.isLoggedIn=true;
    }
    else
    this.isLoggedIn=false;
   
    
  }
}
