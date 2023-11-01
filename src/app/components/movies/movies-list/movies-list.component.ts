import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie | any;

  constructor(private movieService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.get().subscribe((movies: any) => {
      this.movies = movies;
      console.log('recibimos las películas? ', movies);
    });
  }

  // Ruta para navegar a los datos de 1 película
  MovieInfo(id: Number) {
    this.router.navigate(['explore-movies', id]);
  }
}
