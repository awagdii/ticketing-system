import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';


// const myRoutes:Routes=[{path:'',component:HomeComponent},
// {path:'customers',loadChildren:()=>import('./customers/customers.module').then(m=>m.CustomersModule)},
// ]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule//,HttpClientModule,RouterModule.forRoot(myRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
