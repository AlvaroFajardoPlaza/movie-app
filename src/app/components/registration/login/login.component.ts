import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private _router = inject(Router);
	private _formBuilder = inject(FormBuilder);
	userService = inject(AuthService);
	LoginForm: FormGroup;

	// Dentro del constructor creamos un nuevo FormGroup
	constructor() {
		this.LoginForm = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	navigateToRegister() {
		this._router.navigate(['register']);
	}

	async onSubmit() {
		const response = await this.userService.login(this.LoginForm.value);
		console.log('respuesta al login: ', response);

		// Falta realizar la redirección del usuario a la página de explore-movies
		this._router.navigate(['explore-movies']);
	}
}
