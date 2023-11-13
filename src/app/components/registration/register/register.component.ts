import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/RegisterForm.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	private _router = inject(Router);
	private _authSvc = inject(AuthService);
	private _formBuilder = inject(FormBuilder);

	registerForm: RegisterForm | any;

	constructor() {
		// CONSTRUCCIÓN DE FORMULARIO REACTIVO FORMBUILDER
		this.registerForm = this._formBuilder.group({
			username: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(20)
				]
			],
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(50),
					Validators.pattern(
						'^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
					)
				]
			]
		});
	}

	navigateToLogin() {
		this._router.navigate(['login']);
	}

	async onSubmit() {
		const response = await this._authSvc.register(this.registerForm.value);
		console.log('Nuestra respuesta al register: ', response);

		// Falta realizar la redirección del usuario a la página de explore-movies
		await this._router.navigate(['explore-movies']);
	}
}
