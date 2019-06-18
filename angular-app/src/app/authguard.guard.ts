import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { TokenService } from './users/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate  {
  constructor(private router: Router, private tokenService: TokenService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let usr=this.tokenService.getUserInfo();  
    if(usr != null)
      {
        if( route.routeConfig.path.toLowerCase().indexOf('employees') != -1 && usr.role=='employee')
        return true;
        else if( route.routeConfig.path.toLowerCase().indexOf('customers') != -1 && usr.role=='customer')
        return true;
      }
      this.router.navigate(['/error']);
      return false;
  }
}
