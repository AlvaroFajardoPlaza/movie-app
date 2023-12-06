import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { Comment } from 'src/app/models/comment.interfaze';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import {
	faSquareMinus,
	faFileEdit,
	faCircleArrowRight,
	faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-my-user',
	templateUrl: './my-user.component.html',
	styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit, OnDestroy {
	faSquareMinus = faSquareMinus;
	faFileEdit = faFileEdit;
	faCircleArrowRight = faCircleArrowRight;
	faBookmark = faBookmark;
	// Dentro de este componente nos vamos a traer la información del usuario, así como todos sus comentarios y la película a la que quedan relacionados
	// Tendrá la posibilidad de modificar su información personal y sus comentarios
	private _authSvc = inject(AuthService);
	private _commentsSvc = inject(CommentsService);
	private _formbuilder = inject(FormBuilder);

	user$: Observable<User> = this._authSvc.user$;
	user: User;

	username: string;
	// Lo pasamos por una pipe que le haga un map
	userReviews$: Observable<Array<Comment>> =
		this._commentsSvc.findByUsername('alvf');

	// A parte de traer los comentarios, necesitamos también el nombre de cada película

	subscription: Subscription;

	editReviewForm: FormGroup;

	ratings: any[] = [
		{ name: '1 estrella', value: 1 },
		{ name: '2 estrellas', value: 2 },
		{ name: '3 estrellas', value: 3 },
		{ name: '4 estrellas', value: 4 },
		{ name: '5 estrellas', value: 5 }
	];

	constructor() {
		this.editReviewForm = this._formbuilder.group({
			comment: [null, Validators.required],
			rating: [null, Validators.required]
		});
	}

	ngOnInit(): void {
		this.user$.subscribe((user) => {
			this.user = user;
			user.username = this.username;
			console.log('Datos usuario: ', user);
		});
		// this.userComments$ = this._commentsSvc.findByUsername(this.username);
		// console.log(this.userComments$);
	}

	// Función para llamar al modal que se abrirá y nos permitirá editar los datos del comentario
	OpenModalEdit() {
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

	OpenModalDelete() {
		const deleteModal = document.getElementById('');
		if (deleteModal != null) {
			console.log('Tenemos el delete modal en nuestra plantilla');
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
