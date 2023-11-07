import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem.interface';

@Component({
	selector: 'app-horizontal-bar',
	templateUrl: './horizontal-bar.component.html',
	styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit {
	private _router = inject(Router);
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

	registerRedirect() {
		this._router.navigate(['register']);
	}

	loginRedirect() {
		this._router.navigate(['login']);
	}

	ngOnInit(): void {}
}
