import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment.interfaze';
import { CommentsService } from 'src/app/services/comments.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _commentsService = inject(CommentsService);

	averageMovieRating: number | null; // Dentro de esta variable meteremos el resultado del rating total

	refresher$ = new BehaviorSubject<void>(null);

	comment: Comment | any;
	// subscription: Subscription; // Subscription --> ¿Cuando dejamos de recibir el stream de data? No lo necesitamos
	movieId: number = +this._activatedRoute.snapshot.paramMap.get('id');

	// Este observable nos devuelve una lista con los comentarios y ratings referentes a esta movieId
	commentsList$: Observable<Array<Comment>> = this.refresher$.pipe(
		switchMap((_) => this._commentsService.findById(this.movieId))
	);

	// Mandamos el rating al componente de nivel superior
	// No necesitamos este output ya que hacemos una llamada al servicio más especifica
	// @Output() sendRatingToMovieComponent = new EventEmitter<number>();

	// sendRating(): void {
	// 	this.sendRatingToMovieComponent.emit(this.averageMovieRating);
	// }

	ngOnInit(): void {
		this.commentsList$.subscribe((comments) => {
			console.log('Recibimos los comentarios: ', comments);
		});
	}

	// Comprobar si el usuario que está loggeado es el mismo que al que queremos ir.
	// Si es así, le tenemos que redirigir a /user/mypanel/:username
	NavigateToUser(username: string) {
		return this._router.navigate(['user/', username]);
	}

	onNewCommentSubmit() {
		this.refresher$.next();
	}
}
