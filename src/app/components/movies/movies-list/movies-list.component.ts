import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.interface';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-movies-list',
	templateUrl: './movies-list.component.html',
	styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
	movies: Movie[] = [];
	movie: Movie | any;
	subscription: Subscription;

	constructor(private movieService: MoviesService, private router: Router) {}

	ngOnInit(): void {
		this.movieService.getAll().subscribe((movies: any) => {
			this.movies = movies;
			console.log('recibimos las películas? ', movies);
		});
	}

	// Ruta para navegar a los datos de 1 película
	MovieInfo(id: Number) {
		this.router.navigate(['explore-movies', id]);
	}

	// ngOnDestroy(): void {
	// 	this.subscription.unsubscribe();
	// }
}
