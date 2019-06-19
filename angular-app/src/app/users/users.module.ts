import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { LogoffComponent } from './logoff/logoff.component';
import { MaterialModule } from '../material-module';


const myRoutes: Routes = [
	{ path : '', component: LoginComponent},
  { path: 'login', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  { path: 'logoff', component:LogoffComponent},
  {path:'**',component:LoginComponent}
];


@NgModule({
  declarations: [	SignupComponent,
		LoginComponent,
		LogoffComponent],
  imports: [
    CommonModule,HttpClientModule,RouterModule.forChild(myRoutes),ReactiveFormsModule, MaterialModule
  ],
  providers:[UsersService]
})
export class UsersModule { }
