import { Component, inject } from '@angular/core';
import { Comment } from 'src/app/models/comment.interfaze';
import { CommentsService } from 'src/app/services/comments.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent {
	comment: Comment | any;
	subscription: Subscription; // Subscription --> ¿Cuando dejamos de recibir el stream de data?

	// Inyectamos el servicio que nos devuelve los comentarios
	private _commentsService = inject(CommentsService);

	commentsList$: Observable<Array<Comment>> = this._commentsService.getAll();
}
