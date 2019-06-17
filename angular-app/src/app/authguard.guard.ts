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
    console.log('in');
      if(this.tokenService.getUserInfo() != null)
      return true; //Eman check if role customer or not
      this.router.navigate(['/error']);
      return false;
  }
}
