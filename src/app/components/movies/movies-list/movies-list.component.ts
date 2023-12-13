import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.interface';
import {
	BehaviorSubject,
	Observable,
	Subscription,
	catchError,
	filter,
	map,
	switchMap,
	tap
} from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserRole } from 'src/app/models/user-role';
import { User } from 'src/app/models/user.interface';
import { MovieGenre } from 'src/app/models/movie-genre';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-movies-list',
	templateUrl: './movies-list.component.html',
	styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
	// Al inyectar los servicios, no es necesario emplear el constructor del componente
	private _router = inject(Router);
	private _activatedRouter = inject(ActivatedRoute);
	private _movieService = inject(MoviesService);
	private _authSvc = inject(AuthService);
	private _formBuilder = inject(FormBuilder);

	faSquareMinus = faSquareMinus;
	movies: Array<Movie> = [];
	movie: Movie | any;
	subscription: Subscription; // Esta subscription nos es útil al manejar el ciclo de vida del componente.

	moviesList$: Observable<Array<Movie>> = this._movieService.getAll();

	searchMovieForm: FormGroup | any;
	filteredMovieList$: Observable<Array<Movie>> = this.moviesList$;

	movieGenres$: Observable<Array<MovieGenre>> =
		this._movieService.getAllGenres();

	userLogged$ = this._authSvc.user$;
	username: string;

	// Conseguimos el rol del usuario
	userRole$: Observable<UserRole> = this._authSvc.userRole$;

	selectedMovieId: number = null;

	refresher$ = new BehaviorSubject<void>(null);

	constructor() {
		this.searchMovieForm = this._formBuilder.group({
			text: [null, Validators.required]
		});

		this.searchMovieForm.patchValue({
			text: 'amanece'
		});
	}

	// Esperamos a que cargue el componente antes de iniciar el Observable
	ngOnInit() {
		this.subscription = this.moviesList$.subscribe((movies: any) => {
			this.movies = movies;
			console.log('Listado de películas: ', movies);
		});

		// Tenemos un usuario loggeado? Nos subscribimos al observable
		this.userLogged$.subscribe((user) => {
			this.username = user.username;
			console.log('El usuario está loggeado?', user);
		});
		this.userRole$.subscribe((role) => {
			console.log(role);
		});

		// Tenemos que subscribirnos al servicio que nos trae los generos
		this.movieGenres$.subscribe((genre) => {
			console.log('Traemos cada genero?', genre);
		});
	}

	// Función Search Bar que nos filtrará los resultados de nuestra lista
	filterResults(text: string) {
		console.log('Tenemos algo en el input?', text);
		if (!text) {
			console.log('No se ha introducido nada en el input');
			this.filteredMovieList$ = this.moviesList$;
			return;
		}
		// Tenemos que plantear un filter dentro del observable
		this.filteredMovieList$ = this.moviesList$.pipe(
			map((movies) =>
				movies.filter((movie: Movie) =>
					movie.title.toLowerCase().includes(text.toLowerCase())
				)
			)
		);
	}

	// Función filter por Movie Genre
	filterByMovieGenre(movieGenre: number) {
		console.log(
			'Este es el valor del género que hemos clickado:',
			movieGenre
		);
		this.filteredMovieList$ =
			this._movieService.getMoviesByMovieGenre(movieGenre);
		console.log('Tenemos el listado?', this.filteredMovieList$);
	}

	// Rutas de navegación dentro del componente
	MovieInfo(id: Number) {
		this._router.navigate([/movies/, id]);
	}

	AddNewMovie() {
		this._router.navigate(['explore-movies/add']);
	}

	OpenDeleteModal(movieId: number) {
		console.log('tenemos el id de la pelicula', movieId);
		this.selectedMovieId = movieId;
	}

	sofDelete() {
		console.log('Movie id: ', this.selectedMovieId);
		if (this.selectedMovieId) {
			this._movieService.softDelete(this.selectedMovieId).subscribe(
				() => {
					console.log('Pelicula soft-deleteada');
					this.filterResults('');
				},
				(err) => {
					console.log('Ha habido un error...', err);
				}
			);
		}
	}

	hardDelete(id: number | any) {
		console.log('El id de la película es: ', id);

		// Nos tenemos que asegurar de subscribirnos al observable para manejar la respuesta a la llamada HTTP
		if (id) {
			this._movieService.hardDelete(id).subscribe(
				() => {
					console.log('Película eliminada!');
					// this.refresher$.next();
					this.filterResults('');
				},
				(err) => {
					console.log('Ha habido un error', err);
				}
			);
		}
	}
}
