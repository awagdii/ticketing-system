import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable,of,from } from "rxjs";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  subscription;

  constructor(private formBuilder: FormBuilder,private httpclient :HttpClient
    ,private userservice:UsersService,private router:Router ) {
  }

  onSubmit() {
    this.userservice.saveUser(this.myForm.get('userData')).subscribe(data=>
      {
        console.log(data);
        this.router.navigate(['/login']);
      }
      );;
  }

  ngOnDestroy()
  {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'userData': this.formBuilder.group({
        'user_name': ['', [Validators.required]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password': ['', Validators.required],
      'confirmpassword': ['', Validators.required]
      })
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
}


}
