import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.interfaze';
import { environment } from 'src/environments/environment';
import { RatingResponse } from '../models/rating-response';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {
	// Necesitamos importar el modulo httpClient y el prefix de la ruta al backend
	private _http = inject(HttpClient);
	prefix: string = 'api/comments';

	// Llamada a todos los comentarios que existen en la tabla "commentsTable" >>>
	getAll(): Observable<Array<Comment>> {
		return this._http.get<Array<Comment>>(
			`${environment.baseUrl}/${this.prefix}`
		);
	}

	// Llamada a los comentarios de un user por su user.username
	findByUsername(username: string): Observable<Array<Comment>> {
		console.log('recibes el username?', username);
		return this._http.get<Array<Comment>>(
			`${environment.baseUrl}/${this.prefix}/myUser/${username}`
		);
	}

	// Recopila los comentarios de una película por su movieId >>>
	findById(movieId: number): Observable<Array<Comment>> {
		return this._http.get<Array<Comment>>(
			`${environment.baseUrl}/${this.prefix}/${movieId}`
		);
	}

	// Post de un nuevo comentario >>>
	post(commentValues: Comment): Observable<Comment> {
		console.log('Este es nuestro nuevo comentario: ', commentValues);
		return this._http.post<Comment>(
			`${environment.baseUrl}/${this.prefix}`,
			commentValues
		);
	}

	// Rating de pelicula por su movieId >>> transformar a number
	rating(movieId: string): Observable<RatingResponse> {
		return this._http.get<RatingResponse>(
			`${environment.baseUrl}/${this.prefix}/rating/${movieId}`
		);
	}

	// Soft delete de los comentarios
	softDelete(reviewId: string) {
		console.log('entramos al soft delete');
		const result = this._http.put(
			`${environment.baseUrl}/${this.prefix}/softdelete/${reviewId}`,
			''
		);
		console.log(result);
		return result;
	}
}
