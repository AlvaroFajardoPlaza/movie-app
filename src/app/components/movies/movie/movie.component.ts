import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { MovieGenre } from 'src/app/models/movie-genre';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
	private _activatedRoute = inject(ActivatedRoute);

	movie: Movie | any;
	genres: Array<MovieGenre> | any = [];

	// De la url recibimos el valor del id en un string. empleamos snapshot para coger el valor estático de la url y evitar que cambie y luego el método paramMap "mapeo de parámetros de la url". Después hacemos un get
	id: string | null = this._activatedRoute.snapshot.paramMap.get('id');

	// Manera + eficiente de hacer llamadas http empleando observables. Evitamos usar OnInit, OnDestroy y subscription.
	movie$: Observable<Movie> = this._activatedRoute.paramMap.pipe(
		// De las variables de la url, nos quedamos sólo con el id
		map((params: ParamMap) => params.get('id')),

		// Si no llega el id, no continuamos
		filter((id: string | null) => !!id),

		// Obtenemos la película a través del id
		switchMap((id: string) => this.movieService.findById(+id))
	);

	movieGenres$: Observable<Array<MovieGenre>> = this.movieService.getGenres(
		+this.id
	);

	subscription: Subscription;

	constructor(private movieService: MoviesService) {}

	ngOnInit(): void {
		if (this.id) {
			this.subscription = this.movieService
				.findById(+this.id)
				.subscribe((movie: Movie) => {
					this.movie = movie;
					console.log('Estos son los datos de la película: ', movie);
				});
		}
		this.subscription = this.movieGenres$.subscribe((genres) => {
			this.genres = genres;
			console.log('Estamos trayendo los generos de la película?', genres);
		});
	}

	// Tenemos que generar la llamada que nos trae el rating total de la película

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
