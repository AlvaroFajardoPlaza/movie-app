import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.interface';
import { Observable, Subscription } from 'rxjs';

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

	// Ruta para navegar a los datos de 1 película
	MovieInfo(id: Number) {
		this._router.navigate([/movies/, id]);
	}

	AddNewMovie() {
		this._router.navigate(['explore-movies/add']);
	}

	Delete(id: Number) {
		console.log('El id de la película es: ', id);

		// Nos tenemos que asegurar de subscribirnos al observable para manejar la respuesta a la llamada HTTP
		if (id) {
			this._movieService.delete(id).subscribe(
				() => {
					console.log('Película eliminada!');
					this.movies = this.movies.filter(
						(movie) => movie.id !== id
					);
				},
				(err) => {
					console.log('Ha habido un error', err);
				}
			);
		}
	}
}
