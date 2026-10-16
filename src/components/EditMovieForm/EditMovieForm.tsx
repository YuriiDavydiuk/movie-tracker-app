import { movieSchema } from '../../validation/movieSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Movie, MovieUpdate } from '../../types/movie';
import { updateMovie } from '../../services/movieService';
import { getMovieErrorMessage } from '../../utils/getMovieErrorMessage';
import AlertMessage from '../AlertMessage/AlertMessage';

interface EditMovieFormProps {
  movie: Movie;
  onClose: () => void;
}

export default function EditMovieForm({ movie, onClose }: EditMovieFormProps) {
  interface FormData {
    title: string;
    releaseYear: number | string;
    tagline: string;
    status: 'plan' | 'watching' | 'watched';
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      onClose();
    },
  });

  const handleSubmit = (values: FormData) => {
    const payload: MovieUpdate = {
      _id: movie._id,
      title: values.title.trim(),
      tagline: values.tagline,
      status: values.status,
    };
    if (String(values.releaseYear).trim() !== '') {
      payload.releaseYear = Number(values.releaseYear);
    }
    mutation.mutate(payload);
  };
  const fieldClasses =
    'min-h-10 w-full min-w-0 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600';

  const errorClasses = 'mt-1 block text-xs text-red-600 wrap-anywhere';

  return (
    <Formik
      initialValues={{
        title: movie.title ?? '',
        releaseYear: movie.releaseYear ?? '',
        tagline: movie.tagline ?? '',
        status: movie.status ?? 'plan',
      }}
      validationSchema={movieSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Edit movie</h2>

        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-900">
            Title
          </label>
          <Field id="title" type="text" name="title" className={fieldClasses} />
          <ErrorMessage name="title" component="span" className={errorClasses} />
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-900">
            Status
          </label>
          <Field as="select" id="status" name="status" className={fieldClasses}>
            <option value="plan">Plan</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </Field>
          <ErrorMessage name="status" component="span" className={errorClasses} />
        </div>

        <div>
          <label htmlFor="releaseYear" className="mb-1 block text-sm font-medium text-gray-900">
            Release Year
          </label>
          <Field id="releaseYear" type="text" name="releaseYear" className={fieldClasses} />
          <ErrorMessage name="releaseYear" component="span" className={errorClasses} />
        </div>

        <div>
          <label htmlFor="tagline" className="mb-1 block text-sm font-medium text-gray-900">
            Tagline
          </label>
          <Field id="tagline" type="text" name="tagline" className={fieldClasses} />
          <ErrorMessage name="tagline" component="span" className={errorClasses} />
        </div>
        {mutation.isError && (
          <AlertMessage message={getMovieErrorMessage(mutation.error, 'edit')} />
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="min-h-10 cursor-pointer rounded border border-gray-300 bg-gray-50 px-4 py-2 text-base text-gray-900 transition-colors hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-10 cursor-pointer rounded bg-blue-600 px-4 py-2 text-base text-white transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
