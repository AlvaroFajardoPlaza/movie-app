import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private _http = inject(HttpClient);
	baseUrl: string;

	//Dentro del constructor podemos inicializar nuestra url de base
	constructor() {
		this.baseUrl = 'http://localhost:8000/api/users';
	}

	// Registro de usuarios
	// El método FirstValueForm de Rxjs permite convertir un observable en una promesa. De esta forma obtenemos el primer valor emitido por el observable. Esto permite continuar con la ejecución del código una vez que se obtiene el valor de la llamada HTTP.
	register(registerValues: any) {
		return firstValueFrom(
			this._http.post<any>(`${this.baseUrl}/register`, registerValues)
		);
	}

	login(loginValues: any) {
		return firstValueFrom(
			this._http.post<any>(`${this.baseUrl}/login`, loginValues)
		);
	}
}
