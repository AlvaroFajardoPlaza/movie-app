export interface User {
	// Datos esenciales del usuaru¡io
	id?: number;
	username?: string;
	email?: string;
	password?: string;

	// Datos específicos del usuario
	profilePicture?: string;
	aboutMe?: string;
	city?: string;
	region?: string;
	country?: string;
	phoneNumber?: string | number;
	favMovies?: Array<string>;
	favGenres?: Array<string>;
	favDirector?: string;
}
