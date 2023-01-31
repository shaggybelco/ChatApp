import { Component, OnInit } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor() {}

  contacts:any = [];

  ngOnInit() {
    this.retrieveListOfContacts();
  }

  retrieveListOfContacts = async () => {
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    };

    const result = await Contacts.getContacts({
      projection,
    })

    console.log(result);

    this.contacts = [...this.contacts, ...result.contacts];
  };

  isModalOpen = false;

  async setOpen(isOpen: boolean, id?: any) {
    this.isModalOpen = isOpen;
    if(id){
      const projection ={
        name: true,
        phones: true,
      }

      const result = await Contacts.getContact(id);

      alert(result.contact.name?.display);
    }
  } 
}
