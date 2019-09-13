import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: DataService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    })

  }

  ngOnInit() {
  }

  submit() {
    this.service.updateUser(this.form.value)
      .subscribe(
        (res: any) => {
          this.showSuccess(res.message);
        }
      )
  }

  async showSuccess(message) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });

    alert.present();
  }

}
