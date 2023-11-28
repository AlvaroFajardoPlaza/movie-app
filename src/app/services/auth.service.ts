import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
	BehaviorSubject,
	Observable,
	firstValueFrom,
	of,
	switchMap,
	tap
} from 'rxjs';
import { LoginResponse } from '../models/LoginResponse.interface';
import { environment } from 'src/environments/environment';
import { UserRole } from '../models/UserRole.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _router = inject(Router);
	private _http = inject(HttpClient);
	prefix: string = 'api/users';

	token$ = new BehaviorSubject<string>(localStorage.getItem('token') ?? null);

	user$: Observable<any> = this.token$.pipe(
		switchMap((token) => {
			if (!token) {
				return of(null);
			} else {
				return this.me();
			}
		})
	);

	userRole$: Observable<Array<UserRole>> = this.user$.pipe(
		switchMap((id) => {
			if (!id) {
				return of(null);
			} else {
				return this.getRole(+id);
			}
		})
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
