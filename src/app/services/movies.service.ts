import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';
import { Observable, firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MovieGenre } from '../models/movie-genre';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	// Al llamar al servicio de http con inject (Angular 16) podemos obviar el constructor
	private http = inject(HttpClient);
	prefix: string = 'api/movies';

	// Llamada a todas las películas
	getAll(): Observable<Array<Movie>> {
		return this.http.get<Array<Movie>>(
			`${environment.baseUrl}/${this.prefix}`
		);
	}

	// Llamada a 1 película por su id
	findById(id: number): Observable<Movie> {
		return this.http.get<Movie>(
			`${environment.baseUrl}/${this.prefix}/${id}`
		);
	}

	// Llamada a los géneros de una película por su id
	getGenres(id: number): Observable<Array<MovieGenre>> {
		return this.http.get<Array<MovieGenre>>(
			`${environment.baseUrl}/${this.prefix}/${id}/genres`
		);
	}

	// Esta llamada la utilizaremos para mostrar los géneros en el newMovieForm
	getAllGenres(): Observable<Array<MovieGenre>> {
		return this.http.get<Array<MovieGenre>>(
			`${environment.baseUrl}/${this.prefix}/genres`
		);
	}

	// Añadimos una nueva película y solicitamos una Promesa
	post(movieValues: Movie): Observable<Movie> {
		console.log('Estos son los valores del formulario: ', movieValues);
		return this.http.post<Movie>(
			`${environment.baseUrl}/${this.prefix}`,
			movieValues
		);
	}

	// Borramos una película
	delete(id: Number): Observable<Movie> {
		return this.http.delete<Movie>(
			`${environment.baseUrl}/${this.prefix}/${id}`
		);
	}
}
