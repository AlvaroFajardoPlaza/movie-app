import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, filter, map, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';

export class Repaso1 implements OnInit, OnDestroy {
	// Queremos llamar a 1 película por su id al hacer click en su card.
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _movieService = inject(MoviesService);

	movie: Movie | any;
	id: string | null = this._activatedRoute.snapshot.paramMap.get('id');
	subscription: Subscription;

	movie$: Observable<Movie> = this._activatedRoute.paramMap.pipe(
		map((params: ParamMap) => params.get('id')),
		filter((id: string | null) => !!id),
		switchMap((id: string) => this._movieService.findById(+id))
	);

	ngOnInit(): void {
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
