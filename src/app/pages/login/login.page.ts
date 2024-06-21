import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoGoogle, logoApple } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { register } from 'swiper/element/bundle';
import { SignupPage } from '../signup/signup.page';
import Swiper from 'swiper';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class LoginPage implements OnInit {
 credentials!: FormGroup;
              @ViewChild('swiper')
              swiperRef: ElementRef | undefined;
              swiper?: Swiper;
             

              

              next(){
                this.swiper?.slideNext();
              }
              
              async start() {
              await Preferences.set({ key: INTRO_KEY, value: 'true' });
              this.router.navigateByUrl('/signup', { replaceUrl: true });
                }
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

 async login() {
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
