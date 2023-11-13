import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/MenuItem.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-horizontal-bar',
	templateUrl: './horizontal-bar.component.html',
	styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {
	private _router = inject(Router);
	private _authSvc = inject(AuthService);

	user$ = this._authSvc.user$;

	//Creamos nuestro listado de menuItems
	MenuItems: Array<MenuItem> = [
		{
			label: 'explore',
			route: 'explore-movies'
		},
		{
			label: 'features',
			route: 'features'
		},
		{
			label: 'pricing',
			route: 'pricing'
		},
		{
			label: 'about us',
			route: 'about-us'
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

	logout() {
		this._authSvc.logout();
	}
}
