import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
register();

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class IntroPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(private router: Router) {}

  ngOnInit() {}

  next(){
    console.log('click')
    this.swiper?.slideNext();
  }
  
  
  async start() {
 await Preferences.set({ key: INTRO_KEY, value: 'true' });
 this.router.navigateByUrl('/login', { replaceUrl: true });
   }
}