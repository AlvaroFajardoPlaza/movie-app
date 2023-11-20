import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.interfaze';
import { environment } from 'src/environments/environment';

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
}
