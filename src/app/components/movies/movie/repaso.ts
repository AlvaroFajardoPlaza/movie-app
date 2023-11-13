import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';

export class Repaso1 implements OnInit, OnDestroy {
	// Queremos llamar a 1 película por su id al hacer click en su card.
	// Necesitamos el router, activated route, el servicio por el que hacemos la llamada http y observables.
	private _movieService = inject(MoviesService);
	private _activatedRoute = inject(ActivatedRoute);
	movie: Movie | any;

	// PRIMER MÉTODO ----> OBSERVABLES

	movie$: Observable<Movie> = this._activatedRoute.paramMap.pipe(
		map((params: ParamMap) => params.get('id')),
		filter((id: string | null) => !!id),
		switchMap((id: string) => this._movieService.findById(+id))
	);

	// SEGUNDO MÉTODO MENOS EFICIENTE //
	id: string | null = this._activatedRoute.snapshot.paramMap.get('id'); //Si lo hacemos con OnInit
	subscription: Subscription;

	ngOnInit(): void {
		// Hay que implementarlo con la condición de recibir el id
		if (this.id) {
			this.subscription = this._movieService
				.findById(+this.id)
				.subscribe((movie) => (this.movie = movie));
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
