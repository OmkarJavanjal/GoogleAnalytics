import { Component } from '@angular/core';

@Component({
  selector: 'app-contactdetails',
  template: `
<br>
<h3>{{contact.firstName}}</h3>
<div>
  Phone : {{contact.phone}}<br>
  Email : {{contact.email}}
</div>
  `,
  inputs: ["contact"],
})
export class ContactdetailsComponent {
 public contact = {};
}
