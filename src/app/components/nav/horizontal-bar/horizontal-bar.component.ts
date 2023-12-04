import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/MenuItem.interface';
import { AuthService } from 'src/app/services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-horizontal-bar',
	templateUrl: './horizontal-bar.component.html',
	styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {
	private _router = inject(Router);
	private _authSvc = inject(AuthService);
	faUser = faUser;

	user$ = this._authSvc.user$;

	//Creamos nuestro listado de menuItems
	MenuItems: Array<MenuItem> = [
		{
			label: 'explorar películas',
			route: 'explore-movies'
		},
		{
			label: 'implementaciones',
			route: 'features'
		},
		// {
		// 	label: 'pricing',
		// 	route: 'pricing'
		// },
		{
			label: 'el equipo',
			route: 'about-me'
		}
	];
	constructor() {}

	ngOnInit(): void {}

	registerRedirect() {
		this._router.navigate(['register']);
	}

	loginRedirect() {
		this._router.navigate(['login']);
	}

	navigateToMyUserPanel() {
		this._router.navigate(['myUser']);
	}

	logout() {
		this._authSvc.logout();
	}
}
