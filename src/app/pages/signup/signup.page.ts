import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoGoogle, logoApple } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
 credentials!: FormGroup;

 constructor(
  private fb: FormBuilder,
  private authService: AuthenticationService,
  private alertController: AlertController,
  private router: Router,
  private loadingController: LoadingController
 ) { 
    addIcons({
      logoGoogle, logoApple
    });
  }

 ngOnInit() {
  this.credentials = this.fb.group({
   email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
   password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
  });
 }

 async signup() {
  const loading = await this.loadingController.create();
  await loading.present();

  this.authService.login(this.credentials.value).subscribe(
   async (res) => {
    await loading.dismiss();
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
   },
   async (res) => {
    await loading.dismiss();
    const alert = await this.alertController.create({
     header: 'Login failed',
     message: res.error.error,
     buttons: ['OK']
    });

    await alert.present();
   }
  );
 }

 // Easy access for form fields
 get email() {
  return this.credentials.get('email');
 }

 get password() {
  return this.credentials.get('password');
 }
}