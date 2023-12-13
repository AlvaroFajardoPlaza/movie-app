import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { MovieGenre } from 'src/app/models/movie-genre';
import { MoviesService } from 'src/app/services/movies.service';
import { CommentsService } from 'src/app/services/comments.service';
import { RatingResponse } from 'src/app/models/rating-response';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from 'src/app/models/user-role';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
	private _activatedRoute = inject(ActivatedRoute);
	private _movieSvc = inject(MoviesService);
	private _commentsService = inject(CommentsService);
	private _authSvc = inject(AuthService);

	loggedUser: User; // Comprobamos el rol del usuario que está loggeado

	movie: Movie | any;
	genres: Array<MovieGenre> | any = [];
	rating2: any;

	// De la url recibimos el valor del id en un string. empleamos snapshot para coger el valor estático de la url y evitar que cambie y luego el método paramMap "mapeo de parámetros de la url". Después hacemos un get
	id: string | null = this._activatedRoute.snapshot.paramMap.get('id');

	// Manera + eficiente de hacer llamadas http empleando observables. Evitamos usar OnInit, OnDestroy y subscription.
	movie$: Observable<Movie> = this._activatedRoute.paramMap.pipe(
		// De las variables de la url, nos quedamos sólo con el id
		map((params: ParamMap) => params.get('id')),

		// Si no llega el id, no continuamos
		filter((id: string | null) => !!id),

		// Obtenemos la película a través del id
		switchMap((id: string) => this._movieSvc.findById(+id))
	);

	movieGenres$: Observable<Array<MovieGenre>> = this._movieSvc.getGenres(
		+this.id
	);

	movieRating$: Observable<RatingResponse> = this._commentsService.rating(
		this.id
	);

	// Conseguimos el rol del usuario
	//userRole$: Observable<UserRole> = this._authSvc.userRole$;
	userRole$: Observable<UserRole> = this._authSvc.userRole$;

	subscription: Subscription;

	ngOnInit(): void {
		if (this.id) {
			this.subscription = this._movieSvc
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

		this.subscription = this.movieRating$.subscribe((rating) => {
			this.rating2 = rating.finalResult;
		});
	}

	editMovieData() {
		console.log('Editamos los datos de la película desde un modal');
	}

	// Tenemos que recoger la info que nos llega por el @Output
	// onRatingReceived(rating: number) {
	// 	this.rating = rating;
	// 	console.log('Tenemos el rating:', rating);
	// }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
