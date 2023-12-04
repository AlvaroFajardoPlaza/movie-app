import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { Comment } from 'src/app/models/comment.interfaze';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import {
	faSquareMinus,
	faFileEdit,
	faCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-my-user',
	templateUrl: './my-user.component.html',
	styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit, OnDestroy {
	faSquareMinus = faSquareMinus;
	faFileEdit = faFileEdit;
	faCircleArrowRight = faCircleArrowRight;
	// Dentro de este componente nos vamos a traer la información del usuario, así como todos sus comentarios y la película a la que quedan relacionados
	// Tendrá la posibilidad de modificar su información personal y sus comentarios
	private _authSvc = inject(AuthService);
	private _commentsSvc = inject(CommentsService);

	user$: Observable<User> = this._authSvc.user$;

	username: string;
	// Lo pasamos por una pipe que le haga un map
	userReviews$: Observable<Array<Comment>> =
		this._commentsSvc.findByUsername('alvf');

	// A parte de traer los comentarios, necesitamos también el nombre de cada película

	subscription: Subscription;

	ngOnInit(): void {
		this.user$.subscribe((user) => {
			user.username = this.username;
			console.log('Datos usuario: ', user);
		});
		// this.userComments$ = this._commentsSvc.findByUsername(this.username);
		// console.log(this.userComments$);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
