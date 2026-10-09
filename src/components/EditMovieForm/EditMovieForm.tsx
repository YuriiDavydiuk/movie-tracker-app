import { movieSchema } from '../../validation/movieSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import css from '../../styles/MovieForm.module.css';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Movie, MovieUpdate } from '../../types/movie';
import { updateMovie } from '../../services/movieService';

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
      <Form className={css.form}>
        <h2 className={css.heading}>Edit movie</h2>

        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="status">Status</label>
          <Field as="select" id="status" name="status" className={css.select}>
            <option value="plan">Plan</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </Field>
          <ErrorMessage name="status" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="releaseYear">Release Year</label>
          <Field id="releaseYear" type="text" name="releaseYear" className={css.input} />
          <ErrorMessage name="releaseYear" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tagline">Tagline</label>
          <Field id="tagline" type="text" name="tagline" className={css.input} />
          <ErrorMessage name="tagline" component="span" className={css.error} />
        </div>
        {mutation.isError && (
          <p className={css.error} role="alert">
            Could not save the movie. Please try again
          </p>
        )}
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
