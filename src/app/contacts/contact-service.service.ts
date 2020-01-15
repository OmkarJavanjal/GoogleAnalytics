import { Injectable } from '@angular/core';
import { CONTACTS } from './mock-contacts';

@Injectable()
export class ContactServiceService {
    getContacts(){
        return Promise.resolve(CONTACTS);
    }
}
