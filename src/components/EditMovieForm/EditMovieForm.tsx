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
      <Form className="d-flex flex-column gap-3">
        <h2 className="h5 fw-bold mb-0">Edit movie</h2>

        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <Field id="title" type="text" name="title" className="form-control" />
          <ErrorMessage
            name="title"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        <div>
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <Field as="select" id="status" name="status" className="form-select">
            <option value="plan">Plan</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </Field>
          <ErrorMessage
            name="status"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        <div>
          <label htmlFor="releaseYear" className="form-label">
            Release Year
          </label>
          <Field id="releaseYear" type="text" name="releaseYear" className="form-control" />
          <ErrorMessage
            name="releaseYear"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="form-label">
            Tagline
          </label>
          <Field id="tagline" type="text" name="tagline" className="form-control" />
          <ErrorMessage
            name="tagline"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>
        {mutation.isError && (
          <AlertMessage message={getMovieErrorMessage(mutation.error, 'edit')} />
        )}
        <div className="d-flex flex-column flex-sm-row justify-content-sm-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
