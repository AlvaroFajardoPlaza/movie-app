import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes para cada ruta
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MovieComponent } from './components/movies/movie/movie.component';
import { RegisterComponent } from './components/registration/register/register.component';
import { LoginComponent } from './components/registration/login/login.component';
import { authPermissionGuard } from './guards/auth-permission.guard';
import { NewMovieFormComponent } from './components/movies/movies-list/new-movie-form/new-movie-form.component';
import { MyUserComponent } from './components/users/my-user/my-user.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	// Ruta para ver el panel del usuario y modificar sus datos
	{ path: 'myUser', component: MyUserComponent },
	{
		path: 'explore-movies',
		component: MoviesListComponent,
		canActivate: [authPermissionGuard]
		//children: [{ path: ':id', component: MovieComponent }]
	},
	{
		path: 'explore-movies/add',
		component: NewMovieFormComponent,
		canActivate: [authPermissionGuard]
	},
	{
		path: 'explore-movies/:id',
		component: MovieComponent,
		canActivate: [authPermissionGuard]
	},
	{ path: 'pricing', component: PricingComponent },
	{ path: 'features', component: FeaturesComponent },
	{ path: 'about-me', component: AboutUsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
