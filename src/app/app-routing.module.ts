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

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{
		path: 'explore-movies',
		component: MoviesListComponent,
		canActivate: [authPermissionGuard]
		//children: [{ path: ':id', component: MovieComponent }]
	},
	{
		path: 'explore-movies/:id',
		component: MovieComponent,
		canActivate: [authPermissionGuard]
	},
	{ path: 'pricing', component: PricingComponent },
	{ path: 'features', component: FeaturesComponent },
	{ path: 'about-us', component: AboutUsComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
