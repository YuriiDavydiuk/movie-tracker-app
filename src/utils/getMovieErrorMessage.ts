import { isAxiosError } from 'axios';

type MovieAction = 'create' | 'edit' | 'delete';

export function getMovieErrorMessage(error: unknown, action: MovieAction): string {
  if (isAxiosError(error) && error.response?.status === 401) {
    return `You are not authorized to ${action} movies. Please sign in.`;
  }
  return `Could not ${action} the movie. Please try again.`;
}
