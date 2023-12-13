import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
	BehaviorSubject,
	Observable,
	filter,
	firstValueFrom,
	of,
	switchMap,
	tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/LoginResponse.interface';
import { User } from '../models/user.interface';
import { UserRole } from '../models/user-role';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _router = inject(Router);
	private _http = inject(HttpClient);
	prefix: string = 'api/users';

	token$ = new BehaviorSubject<string>(localStorage.getItem('token') ?? null);

	// user$ = new BehaviorSubject<User>(null);
	// userRole$ = new BehaviorSubject<UserRole>(null);

	user$: Observable<any> = this.token$.pipe(
		switchMap((token) => (!token ? of(null) : this.me()))
	);

	userRole$: Observable<UserRole> = this.user$.pipe(
		filter((user: User) => !!user?.id),
		switchMap((user: User) => this.getRole(user.id))
	);

	// Registro de usuarios
	// El método firstValueForm de Rxjs permite convertir un observable en una promesa. De esta forma obtenemos el primer valor emitido por el observable. Esto permite continuar con la ejecución del código una vez que se obtiene el valor de la llamada HTTP.
	register(registerValues: any) {
		return firstValueFrom(
			this._http
				.post<LoginResponse>(
					`${environment.baseUrl}/${this.prefix}/register`,
					registerValues
				)
				.pipe(
					tap((response) => {
						localStorage.setItem('token', response.token);
						this.token$.next(response.token);
					})
				)
		);
	}

	login(loginValues: any) {
		return firstValueFrom(
			this._http
				.post<LoginResponse>(
					`${environment.baseUrl}/${this.prefix}/login`,
					loginValues
				)
				.pipe(
					tap((response) => {
						localStorage.setItem('token', response.token);
						this.token$.next(response.token);
					})
				)
		);
	}

	// Desde el backend, esta llamada verifica el token y extrae los datos del usuario
	me(): Observable<any> {
		return this._http.post<any>(
			`${environment.baseUrl}/${this.prefix}/me`,
			{
				token: localStorage.getItem('token')
			}
		);
	}

	getRole(id: number): Observable<any> {
		return this._http.get<any>(
			`${environment.baseUrl}/${this.prefix}/role/${id}`
		);
	}

	getUserProfile(userUsername: string): Observable<User> {
		return this._http.get<User>(
			`${environment.baseUrl}/${this.prefix}/userInfo/${userUsername}`
		);
	}

	logout() {
		localStorage.removeItem('token');
		this.token$.next(null);
		// return this._http.delete<any>(
		// 	`${environment.baseUrl}/${this.prefix}/logout`,
		// );
		// navigate to login
		return this._router.navigate(['login']);
	}
}
