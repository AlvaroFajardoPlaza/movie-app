import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
	@Output() submit = new EventEmitter<boolean>();
	private _commentsService = inject(CommentsService);
	private _authSvc = inject(AuthService);
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _formBuilder = inject(FormBuilder);

	newCommentForm: FormGroup | any;
	defaultRating: number = 1;
	userLogged = this._authSvc.user$;
	movieId: number | null = +this._activatedRoute.snapshot.paramMap.get('id');

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

	// Vamos a emplear el ngOnInit para settear los valores extra que tendremos que mandar en el formulario
	ngOnInit(): void {
		this.newCommentForm.get('rating').setValue(this.defaultRating);
		// Nos traemos el usuario que está loggeado y mandamos su username al formulario
		this.userLogged.subscribe((user) => {
			this.newCommentForm.get('user').setValue(user.username);
		});
		// Hacemos la misma tarea con el id de la película
		this.newCommentForm.get('movieId').setValue(this.movieId);
	}

	async OnSubmit() {
		if (this.newCommentForm.get('comment').value == null) {
			console.log('No hay texto escrito.');
			return;
		}
		const response = await firstValueFrom(
			this._commentsService.post(this.newCommentForm.value)
		);
		this.submit.next(true);

		console.log(
			'El comentario: ',
			this.newCommentForm.value,
			'La respuesta al submit: ',
			response
		);
	}
}
