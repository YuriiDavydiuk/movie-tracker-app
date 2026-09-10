import axios from 'axios';

import type { MovieHttpResponse, Movie, NewMovie, MovieUpdate } from '../types/movie';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getMovies(
  search: string,
  page: number,
  perPage: number = 5
): Promise<MovieHttpResponse> {
  const response = await api.get<MovieHttpResponse>(`/movies`, {
    params: {
      search,
      page,
      perPage,
    },
  });

  return response.data;
}

export async function createMovie(newMovie: NewMovie): Promise<Movie> {
  const response = await api.post<Movie>(`/movies`, newMovie);
  return response.data;
}

export async function deleteMovie(id: string): Promise<Movie> {
  const response = await api.delete<Movie>(`/movies/${id}`);
  return response.data;
}

export async function getMovieById(id: string): Promise<Movie> {
  const response = await api.get<Movie>(`/movies/${id}`);
  return response.data;
}

export async function updateMovie(movieUpdate: MovieUpdate): Promise<Movie> {
  const { _id, ...updateData } = movieUpdate;
  const response = await api.patch<Movie>(`/movies/${_id}`, updateData);
  return response.data;
}
