import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { NewMovieFormComponent } from './movies-list/new-movie-form/new-movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [MoviesListComponent, MovieComponent, NewMovieFormComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [MoviesListComponent, MovieComponent, NewMovieFormComponent]
})
export class MoviesModule {}
