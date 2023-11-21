import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { NewMovieFormComponent } from './movies-list/new-movie-form/new-movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsListComponent } from './movie/comments-list/comments-list.component';
import { NewCommentFormComponent } from './movie/new-comment-form/new-comment-form.component';

@NgModule({
	declarations: [
		MoviesListComponent,
		MovieComponent,
		NewMovieFormComponent,
		CommentsListComponent,
		NewCommentFormComponent
	],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [
		MoviesListComponent,
		MovieComponent,
		NewMovieFormComponent,
		CommentsListComponent,
		NewCommentFormComponent
	]
})
export class MoviesModule {}
