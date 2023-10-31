import { Component } from '@angular/core';
import { MOVIE } from 'src/app/models/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  movie: MOVIE | any;
}
