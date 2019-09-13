import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private service: DataService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.minLength(6)],
      email: ['', Validators.minLength(6)],
      username: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: 'Criando...' });
    loading.present();

    this.service.createUser(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          console.log(res);
          this.showSuccess(res.message);
        },
        (err: any) => {
          loading.dismiss();
          console.log(err);
          this.showError('Falha ao cadastrar');
        },
        () => {
          loading.dismiss();
        }

      );
  }
  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
    });

    toast.present();
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
