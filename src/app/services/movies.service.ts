import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  //Llamada a todas las películas
  getMovies() {
    return this.http.get('http://localhost:4000/api/movies');
  }

  //Llamada a 1 película por su id
  getMovieById(id: number) {
    return this.http.get(`http://localhost:4000/api/movies/${id}`);
  }


}
