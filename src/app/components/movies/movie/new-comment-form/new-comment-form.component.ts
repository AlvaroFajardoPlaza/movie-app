import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
	selector: 'app-new-comment-form',
	templateUrl: './new-comment-form.component.html',
	styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent implements OnInit {
	private _commentsService = inject(CommentsService);
	private _authSvc = inject(AuthService);
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _formBuilder = inject(FormBuilder);

	newCommentForm: FormGroup | any;
	defaultRating: number = 1;
	userLogged = this._authSvc.user$;
	movieId: string | null = this._activatedRoute.snapshot.paramMap.get('id');

	ratings: any[] = [
		{ name: '1 estrella', value: 1 },
		{ name: '2 estrellas', value: 2 },
		{ name: '3 estrellas', value: 3 },
		{ name: '4 estrellas', value: 4 },
		{ name: '5 estrellas', value: 5 }
	];

	// Generamos nuestro nuevo formulario de comentario desde el constructor
	constructor() {
		this.newCommentForm = this._formBuilder.group({
			comment: [null, [Validators.required, Validators.maxLength(250)]],
			rating: [null, [Validators.required]],
			user: [null, []], // Enviamos el user que está loggeado
			movieId: [null, []] // Enviamos el id de la película que estamos comentando
		});
	}

	ngOnInit(): void {
		this.newCommentForm.get('rating').setValue(this.defaultRating);

		// Nos traemos el usuario que está loggeado y mandamos su username al formulario
		this.userLogged.subscribe((user) => {
			this.newCommentForm.get('user').setValue(user.username);
		});

		// Hacemos la misma tarea con el id de la película
		this.newCommentForm.get('movieId').setValue(+this.movieId);
	}

	async OnSubmit() {
		const response = await firstValueFrom(
			this._commentsService.post(this.newCommentForm.value)
		);
		console.log(
			'El comentario: ',
			this.newCommentForm.value,
			'La respuesta al submit: ',
			response
		);
		// Habría que considerar un hot observable o refrescar la página
	}
}
