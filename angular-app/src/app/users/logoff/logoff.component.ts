import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(private tokenService:TokenService,private router:Router) { }

  ngOnInit() {
    this.tokenService.delete();
    this.router.navigate(['/']);
  }

}
