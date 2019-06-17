import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';


const myRoutes: Routes = [
	{ path : '', component: SignupComponent},
	{ path: 'login', component:LoginComponent},
];


@NgModule({
  declarations: [	SignupComponent,
		LoginComponent],
  imports: [
    CommonModule,HttpClientModule,RouterModule.forChild(myRoutes),ReactiveFormsModule
  ],
  providers:[UsersService]
})
export class UsersModule { }
