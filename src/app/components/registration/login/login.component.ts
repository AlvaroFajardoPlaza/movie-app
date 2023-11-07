import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private _router = inject(Router);
	userService = inject(UsersService);
	LoginForm: FormGroup;

	// Dentro del constructor creamos un nuevo FormGroup
	constructor() {
		this.LoginForm = new FormGroup({
			email: new FormControl(),
			password: new FormControl()
		});
	}

	navigateToRegister() {
		this._router.navigate(['register']);
	}

	async onSubmit() {
		const response = await this.userService.login(this.LoginForm.value);
		console.log('respuesta al login: ', response);
	}
}
