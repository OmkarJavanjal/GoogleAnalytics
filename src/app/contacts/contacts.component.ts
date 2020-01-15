import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from './contact-service.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contacts',
  template: `
    <ul>
  <li *ngFor="let contact of contactList" (click)="onSelect(contact)" [class.clicked]="selectedContact === contact">{{contact.firstName}} {{contact.lastName}}
  </li>
</ul>

<app-contactdetails [contact]="selectedContact"></app-contactdetails>
  `,
  providers: [ContactServiceService]
 
})
export class ContactsComponent implements OnInit {
   public contactList: Contact[];

  public selectedContact={};
  constructor(private _contactService: ContactServiceService){}

  onSelect(contact){
    this.selectedContact=contact;
  }

  getContact(){
    this._contactService.getContacts().then((contactList: Contact[]) => this.contactList = contactList);
  }

  ngOnInit(): any{
      this.getContact();
  }


}
