import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-contacts-editor',
  templateUrl: './contacts-editor.page.html',
  styleUrls: ['./contacts-editor.page.scss'],
})
export class ContactsEditorPage implements OnInit {

  public form: FormGroup;
  public contact: Contact = new Contact();
  isChange: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: DataService,
    private toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('contact');
    if (param != '0') {
      this.getById(param);
      this.isChange = true;
    }
    this.form = this.formBuilder.group({
      id: [this.contact.id],
      name: [this.contact.name, Validators.required],
      email: [this.contact.email, Validators.email],
      cpf: [this.contact.cpf, Validators.compose([Validators.required, CustomValidator.isCpf])],
      address: [this.contact.address],
      image: [this.contact.image],
      phone: [this.contact.phone, Validators.required]
    })
  }

  getById(id) {
    this.service.getContactById(id)
      .subscribe(
        (res: Contact) => {
          if (res) {
            this.contact = res;
            this.form.controls['id'].setValue(this.contact.id);
            this.form.controls['name'].setValue(this.contact.name);
            this.form.controls['email'].setValue(this.contact.email);
            this.form.controls['cpf'].setValue(this.contact.cpf);
            this.form.controls['address'].setValue(this.contact.address);
            this.form.controls['image'].setValue(this.contact.image);
            this.form.controls['phone'].setValue(this.contact.phone);
          }

        }
      );
  }

  add() {
    if (!this.isChange) {
      this.service.addContact(this.form.value)
        .subscribe(
          (res: any) => {
            this.showMessage(res.message);
          }
        )
    }
    else {
      this.service.updateContact(this.form.value)
        .subscribe(
          (res: any) => {
            this.showMessage(res.message);
          }
        )
    }
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
