import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title='Movie Review'
  description='Esto es una app que recibe los datos de las películas que están guardadas en una base de datos en MYSQL.'
}
