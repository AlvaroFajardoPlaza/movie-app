import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
	faBookmark,
	faCircleArrowRight,
	faFileEdit,
	faHeart,
	faSquareMinus
} from '@fortawesome/free-solid-svg-icons';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	faSquareMinus = faSquareMinus;
	faFileEdit = faFileEdit;
	faCircleArrowRight = faCircleArrowRight;
	faBookmark = faBookmark;
	faHeart = faHeart;

	// Inyección de dependencias
	private _activatedRoute = inject(ActivatedRoute);
	private _router = inject(Router);
	private _authSvc = inject(AuthService);
	private _reviewSvc = inject(CommentsService);

	// Traemos los datos de este usuario por su username
	username: string | null =
		this._activatedRoute.snapshot.paramMap.get('userUsername');
	userData$: Observable<User> = this._activatedRoute.paramMap.pipe(
		map((params: ParamMap) => params.get('userUsername')),
		filter((username: string | null) => !!username),
		switchMap((username) => this._authSvc.getUserProfile(username))
	);
	subscription: Subscription;
	data: User;

	userReviews$: Observable<any> = this._activatedRoute.paramMap.pipe(
		map((params: ParamMap) => params.get('userUsername')),
		filter((username: string | null) => !!username),
		switchMap((username) => this._reviewSvc.findByUsername(username))
	);

	userLogged$ = this._authSvc.user$;

	constructor() {}

	ngOnInit(): void {
		// console.log('tenemos el username: ', this.username);
		// if (this.username) {
		// 	this.subscription = this._authSvc
		// 		.getUserProfile(this.username)
		// 		.subscribe((user: User) => (this.data = user));
		// }
		// Tenemos que comprobar que si el usuario al que estamos accediendo es el mismo que está loggeado, nos redirija a my user panel(?)
		// this.userLogged$.subscribe((user) => {
		// 	if ((this.data.username = user.username)) {
		// 		this._router.navigate(['user/mypanel/', this.data.username]);
		// 	}
		// });
	}

	navigateToThisMovie(movieId: number) {
		return this._router.navigate(['explore-movies/', movieId]);
	}

	likeReview() {
		// Si el likeReview está en false suma 1 like
		// Si ya está en true, su estado pasa a false y resta 1
		console.log('Le has dado like!');
	}
}
