import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

   // This is the option that uses the package's AnimationOption interface  
   options: AnimationOptions = {    
    path: '/assets/json/home_background_moviereview.json'  
  };

  title='Movie Review'
  description='Esto es una app que recibe los datos de las películas que están guardadas en una base de datos en MYSQL.'

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
}
