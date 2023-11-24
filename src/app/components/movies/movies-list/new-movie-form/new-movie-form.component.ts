import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
	selector: 'app-new-movie-form',
	templateUrl: './new-movie-form.component.html',
	styleUrls: ['./new-movie-form.component.scss']
})
export class NewMovieFormComponent implements OnInit {
	private _movieService = inject(MoviesService);
	private _router = inject(Router);
	private _formBuilder = inject(FormBuilder);

	newMovieForm: FormGroup | any;

	genres: any[] = [
		{ name: 'acción', value: 1 },
		{ name: 'aventura', value: 2 },
		{ name: 'animación', value: 3 },
		{ name: 'ciencia-ficción', value: 4 },
		{ name: 'comedia', value: 5 },
		{ name: 'documental', value: 6 },
		{ name: 'drama', value: 7 },
		{ name: 'fantasía', value: 8 },
		{ name: 'musical', value: 9 },
		{ name: 'terror', value: 10 },
		{ name: 'suspense', value: 10 }
	];

	genres$ = this._movieService.getAllGenres();

	defaultGenre: number = 1;

	years: number[] = [];
	defaultYear: number = 2023;

	constructor() {
		this.newMovieForm = this._formBuilder.group({
			title: [
				null,
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(60)
				]
			],
			year: [
				null,
				[
					Validators.required,
					Validators.min(1920),
					Validators.max(2023)
				]
			],
			summary: [
				'',
				[
					Validators.required,
					Validators.minLength(25),
					Validators.maxLength(2000)
				]
			],
			image: [null, []],
			genres: [[], []],
			// genre2: [null, []],
			cast: [null, []],
			director: [null, []]
		});

		this.newMovieForm.patchValue({
			title: 'Amanece que no es poco',
			year: 1960,
			summary: 'Lorem Ipsum y blablablabla',
			image: 'https://ih1.redbubble.net/image.2696236726.2233/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
			genres: [2, 4, 5],
			cast: 'Florinda Chico',
			director: 'José Luís Cuerda'
		});
	}

	// Hay que considerar que la relación en la BBDD no es correcta por tanto no estamos enviando bien el dato a su tabla corresppondiente
	ngOnInit(): void {
		// En el caso de que no pasemos un género, enviaremos el valor por defecto 1 == "accion"
		this.selectionYears();
	}

	// Función para conseguir el rango de años que podrán ser introducidos en la tag select del year
	selectionYears() {
		const firstYear = 1920;
		const currentYear = new Date().getFullYear();
		for (let year = firstYear; year <= currentYear; year++) {
			this.years.push(year);
		}
	}

	async onSubmit() {
		const response = await firstValueFrom(
			this._movieService.post(this.newMovieForm.value)
		);
		console.log('Hacemos submit del form', this.newMovieForm.value);
		console.log('response', response);

		// Falta realizar la redirección del usuario a la página de explore-movies
		this._router.navigate(['explore-movies']);
	}

	navigateToExplore() {
		this._router.navigate(['explore-movies']);
	}
}
