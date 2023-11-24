import { Component, inject, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.interfaze';
import { CommentsService } from 'src/app/services/comments.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
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

	ngOnInit(): void {
		// Calcula la media cuando la lista de comentarios se actualiza
		this.commentsList$.subscribe((comments) => {
			const ratings = comments.map((comment) => comment.rating); // Extrae los ratings de los comentarios
			const totalRatings = ratings.reduce(
				(sum, rating) => sum + rating,
				0
			); // Calcula la suma de los ratings
			const numberOfComments = comments.length;
			const result =
				numberOfComments > 0 ? totalRatings / numberOfComments : null; // Calcula la media o asigna null si no hay comentarios
			this.averageMovieRating = Math.round(result * 100) / 100;
		});
	}

	onNewCommentSubmit() {
		this.refresher$.next();
	}
}
