import { Component } from '@angular/core';

@Component({
  selector: 'customer',
  template: '<div> this is my customer  {{customerComeOn}} </div>',
  styles: []
})
export class CustomersComponent {
    customerComeOn = 'i am customer'
}
