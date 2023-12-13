import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { Comment } from 'src/app/models/comment.interfaze';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-my-user',
	templateUrl: './my-user.component.html',
	styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit {
	// Dentro de este componente nos vamos a traer la información del usuario, así como todos sus comentarios y la película a la que quedan relacionados
	// Tendrá la posibilidad de modificar su información personal y sus comentarios
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _authSvc = inject(AuthService);
	private _commentsSvc = inject(CommentsService);
	private _formbuilder = inject(FormBuilder);

	user$: Observable<User> = this._authSvc.user$;
	user: User;
	userInRoute: string | null =
		this._activatedRoute.snapshot.paramMap.get('username');

	username: string;
	reviewId: string;

	userReviews$: Observable<Array<Comment>>;

	subscription: Subscription;

	editReviewForm: FormGroup;

	ratings: any[] = [
		{ name: '1 estrella', value: 1 },
		{ name: '2 estrellas', value: 2 },
		{ name: '3 estrellas', value: 3 },
		{ name: '4 estrellas', value: 4 },
		{ name: '5 estrellas', value: 5 }
	];

	// Dentro del constructor crearemos los distintos forms para manejar la edición de la info
	constructor() {
		this.editReviewForm = this._formbuilder.group({
			comment: [null, Validators.required],
			rating: [null, Validators.required]
		});
	}

	ngOnInit(): void {
		this.user$.subscribe((user) => {
			this.user = user;
			console.log('Datos usuario: ', user);
			this.username = user.username;

			this.userReviews$ = this._commentsSvc.findByUsername(this.username);
		});
	}

	// Boton de navegación a la película
	NavigateToMovie(movieId: number) {
		console.log('El id:', movieId);
		return this._router.navigate(['explore-movies/', movieId]);
	}

	// Función para llamar al modal que se abrirá y nos permitirá editar los datos del comentario
	OpenModalEdit(reviewId: number) {
		this.reviewId = reviewId.toString();
		const editModal = document.getElementById('editModalPopUp');
		if (editModal != null) {
			console.log('Tenemos el edit modal en nuestra plantilla');
		}
	}

	OnEditReview() {
		console.log(
			'Mandamos los nuevos datos de esta review al back y refrescamos'
		);
	}

	// Funciones para abrir modal de soft delete del comentario
	OpenModalDelete(reviewId: number) {
		this.reviewId = reviewId.toString();
		const deleteModal = document.getElementById('');
		if (deleteModal != null) {
			console.log('Tenemos el delete modal en nuestra plantilla');
		}
	}

	softDelete() {
		// console.log('this reviewId:', this.reviewId);
		if (this.reviewId) {
			this._commentsSvc.softDelete(this.reviewId).subscribe(
				() => console.log('Review soft deleteada.'),
				(err) => console.log('Ha habido un error: ', err)
			);
		}
	}

	// ngOnDestroy(): void {
	// 	this.subscription.unsubscribe();
	// }
}
