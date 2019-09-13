import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Contact } from 'src/app/models/contact.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: Contact[];
  constructor(
    private service: DataService,
    private loadingCtrl: LoadingController,
    private router: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  async getContacts() {
    const loading = await this.loadingCtrl.create({ message: 'Buscando contatos...' });
    loading.present();
    this.service.getContacts()
      .subscribe(
        (res: any) => {
          this.contacts = res;
          loading.dismiss();
        },
        (err: any) => {
          loading.dismiss();
        }
      )
  }

  async delete(contact) {
    const loading = await this.loadingCtrl.create({ message: 'Removendo contato...' });
    loading.present();
    this.service.deleteContact(contact)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showMessage(res.message);
          let index = this.contacts.indexOf(contact);
          this.contacts.splice(index, 1);
        },
        (err) => {
          loading.dismiss();
        }
      )
  }

  async showMessage(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      closeButtonText: 'Fechar',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

}
