import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Al llamar al servicio de http con inject (Angular 16) podemos obviar el constructor
  private http = inject(HttpClient);

  // constructor ( private http: HttpClient ) { }

  // Llamada a todas las películas
  get(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:4000/api/movies');
  }

  // Llamada a 1 película por su id
  findById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:4000/api/movies/${id}`);
  }
}
