import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authPermissionGuard: CanActivateFn = (route, state) => {
	if (tokenExists()) {
		return true;
	} else {
		const _router = inject(Router);
		// Aquí podemos implementar un rdirect al login
		alert('No tienes permisos');
		return _router.navigate(['/login']);
	}

	// En nuestro guard de rutas tenemos que chequear que el usuario está loggeado y que existe un token en el localStorage
	function tokenExists(): boolean {
		let userToken: string = localStorage.getItem('token' || null);
		if (!userToken) {
			return false;
		} else {
			console.log('El usuario tiene permisos');
			return true;
		}
	}
};
