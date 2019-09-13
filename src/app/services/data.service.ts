import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  auth(data: any) {
    return this.http
      .post('http://localhost:3000/accounts/authenticate', data);
  }

  createUser(data: any) {
    return this.http
      .post('http://localhost:3000/accounts', data);
  }

  updateUser(data: any) {
    return this.http
      .put('http://localhost:3000/accounts/1', data);
  }

  getContacts() {
    return this.http
      .get('http://localhost:3000/contacts');
  }

  getContactById(id) {
    return this.http
      .get('http://localhost:3000/contacts/1');
  }

  addContact(contact) {
    return this.http
      .post('http://localhost:3000/contacts', contact);
  }

  updateContact(contact) {
    return this.http
      .put('http://localhost:3000/contacts/1', contact);
  }

  deleteContact(contact) {
    return this.http
      .delete(`http://localhost:3000/contacts/1`); //deveria ser o id do contato
  }

}
