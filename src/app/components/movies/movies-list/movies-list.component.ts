import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.interface';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';

@Component({
	selector: 'app-movies-list',
	templateUrl: './movies-list.component.html',
	styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
	movies: Array<Movie> = [];
	movie: Movie | any;
	subscription: Subscription; // Esta subscription nos es útil al manejar el ciclo de vida del componente.

	// Al inyectar los servicios, no es necesario emplear el constructor del componente
	private _router = inject(Router);
	private _activatedRouter = inject(ActivatedRoute);
	private _movieService = inject(MoviesService);

	moviesList$: Observable<Array<Movie>> = this._movieService.getAll();

	// Esperamos a que cargue el componente antes de iniciar el Observable
	ngOnInit() {
		this.subscription = this.moviesList$.subscribe((movies: any) => {
			this.movies = movies;
			console.log('Listado de películas: ', movies);
		});
	}

	// Primer componente lista de películas
	// ngOnInit(): void {
	// 	this.movieService.getAll().subscribe((movies: any) => {
	// 		this.movies = movies;
	// 		console.log('recibimos las películas? ', movies);
	// 	});
	// }

	// Ruta para navegar a los datos de 1 película
	MovieInfo(id: Number) {
		this._router.navigate(['explore-movies', id]);
	}
}
