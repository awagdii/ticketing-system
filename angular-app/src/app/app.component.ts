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

  ngOnInit() {  
    this.refreshHeaders();
    this.tokenService.getRefreshTopHeaderMenuEventEmitter().subscribe(callBack => {
              this.refreshHeaders();
        });
      }

      refreshHeaders()
      {
        setTimeout(() => {
          console.log("header");
        let user=this.tokenService.getUserInfo();
        console.log(user);

        if(user)
        {
        console.log("header1");

          this.isEmployee=user.role=="employee";
          this.isCustomer=user.role=="customer";
          this.isLoggedIn=true;
        }
        else
        {
          this.isEmployee=false;
          this.isCustomer=false;
          this.isLoggedIn=false;
        }
        }, 10);
        
      }

  ngOnChange()
  {
    
  }
}
