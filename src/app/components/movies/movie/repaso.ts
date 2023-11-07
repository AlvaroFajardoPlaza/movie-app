import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, filter, switchMap, Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

export class Repaso {
	movie: Movie | any;
	private _activatedRoute = inject(ActivatedRoute);
	private _movieService = inject(MoviesService);

	movie$: Observable<Movie> = this._activatedRoute.paramMap.pipe(
		//A partir de este punto empleamos los metodos map, filter y switchmap de rxjs
		map((params: ParamMap) => params.get('id')),
		filter((id: string | null) => !!id),
		switchMap((id: string) => this._movieService.findById(+id))
	);

	//Para representarla correctamente en la plantilla de HTML:
	// <div *ngIf= movie$ | async as movie></div>
}

// export class Repaso2 implements OnInit, OnDestroy {
//     movie: Movie | any;
//     private _activatedRoute = inject(ActivatedRoute);
//     private _movieService = inject(MoviesService);
//     id: string | null = this._activatedRoute.snapshot.paramMap.get('id');
//     subscription: Subscription;

//     //Podemos inyectar las dependecias como lo hemos hecho arriba con el inject o mediante el constructor.
//     constructor( private _movieService2: MoviesService, private _activatedRoute2: ActivatedRoute ) { }

//     ngOnInit(): void {
//         if(this.id) {
//             this.subscription = this._movieService
//                 .findById(+this.id)
//                 .subscribe( (movie) => {
//                     this.movie = movie
//                 })

//         }
//     }

//     ngOnDestroy(): void {
//         this.subscription.unsubscribe();
//     }
// }
