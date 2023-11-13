import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
	selector: 'app-new-movie-form',
	templateUrl: './new-movie-form.component.html',
	styleUrls: ['./new-movie-form.component.scss']
})
export class NewMovieFormComponent {
	private _movieService = inject(MoviesService);
	private _router = inject(Router);
	private _formBuilder = inject(FormBuilder);

	newMovieForm: FormGroup | any;

	constructor() {
		this.newMovieForm = this._formBuilder.group({
			title: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(60)
				]
			],
			year: ['', [Validators.required]],
			summary: [
				'',
				[
					Validators.required,
					Validators.minLength(25),
					Validators.maxLength(200)
				]
			],
			comment: ['', []],
			image: ['', []],
			genre1: ['', []],
			genre2: ['', []],
			cast: ['', []],
			director: ['', []]
		});
	}

	async onSubmit() {
		const response = await this._movieService.post(this.newMovieForm.value);
		console.log('Hacemos submit del form', this.newMovieForm.value);

		// Falta realizar la redirección del usuario a la página de explore-movies
		this._router.navigate(['explore-movies']);
	}
}
