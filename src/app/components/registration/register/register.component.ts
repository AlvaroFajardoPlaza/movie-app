import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	private _router = inject(Router);
	userService = inject(UsersService);
	RegisterForm: FormGroup;

	constructor() {
		this.RegisterForm = new FormGroup({
			username: new FormControl(),
			email: new FormControl(),
			password: new FormControl()
		});
	}

	navigateToLogin() {
		this._router.navigate(['login']);
	}

	async onSubmit() {
		const response = await this.userService.register(
			this.RegisterForm.value
		);
		console.log('Nuestra respuesta al register: ', response);
		let userToken: string = response.token;
		localStorage.setItem('token', JSON.stringify(userToken));

		// Falta realizar la redirección del usuario a la página de explore-movies
		this._router.navigate(['explore-movies']);
	}
}
