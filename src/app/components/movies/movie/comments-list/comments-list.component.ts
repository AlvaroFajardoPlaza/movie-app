import { Component, inject } from '@angular/core';
import { Comment } from 'src/app/models/comment.interfaze';
import { CommentsService } from 'src/app/services/comments.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss']
})

// CONVERTIR ESTE COMPONENTE LISTA DE COMENTARIOS A UN HOT OBSERVABLE QUE RECUPERA TODOS LOS CAMBIOS QUE SE VAYAN REGISTRANDO
export class CommentsListComponent {
	private _activatedRoute = inject(ActivatedRoute);
	// Inyectamos el servicio que nos devuelve los comentarios
	private _commentsService = inject(CommentsService);

	comment: Comment | any;
	subscription: Subscription; // Subscription --> ¿Cuando dejamos de recibir el stream de data?
	movieId: string = this._activatedRoute.snapshot.paramMap.get('id');

	commentsList$: Observable<Array<Comment>> = this._commentsService.findById(
		+this.movieId
	);
}
