export interface Movie {
  _id: string;
  title?: string;
  releaseYear?: number;
  tagline?: string;
  poster?: string;
  status?: 'plan' | 'watching' | 'watched';
}

export interface MovieHttpResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  movies: Movie[];
}

export interface NewMovie {
  title: string;
  releaseYear?: number;
  tagline?: string;
  status: 'plan' | 'watching' | 'watched';
}

export interface MovieUpdate {
  _id: string;
  title?: string;
  releaseYear?: number;
  tagline?: string;
  status?: 'plan' | 'watching' | 'watched';
}
