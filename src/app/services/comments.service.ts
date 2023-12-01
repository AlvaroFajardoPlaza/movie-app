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

	// Llamada a todos los comentarios que existen en la tabla "commentsTable"
	getAll(): Observable<Array<Comment>> {
		return this._http.get<Array<Comment>>(
			`${environment.baseUrl}/${this.prefix}`
		);
	}

	findById(id: number): Observable<Array<Comment>> {
		return this._http.get<Array<Comment>>(
			`${environment.baseUrl}/${this.prefix}/${id}`
		);
	}

	// Post de un nuevo comentario
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
}
