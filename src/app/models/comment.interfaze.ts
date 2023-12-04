export interface Comment {
	id: number;
	comment: string;
	rating: number; // Va de 1 a 5
	user: string;
	last_update?: string;
}
