import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavModule } from './components/nav/nav.module';
import { MoviesModule } from './components/movies/movies.module';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

//Módulo para emplear lottiefiles
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Export this function
export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    FeaturesComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavModule,
    MoviesModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
