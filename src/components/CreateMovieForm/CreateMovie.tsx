// styles
import css from '../../styles/MovieForm.module.css';

// libraries
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { movieSchema } from '../../validation/movieSchema';
import type { NewMovie } from '../../types/movie';

// components
import { createMovie } from '../../services/movieService';

interface CreateMovieForm {
  onClose: () => void;
}

interface FormValues {
  title: string;
  releaseYear: number | string;
  tagline: string;
  status: 'plan' | 'watching' | 'watched';
}

const initialValues: FormValues = {
  title: '',
  releaseYear: new Date().getFullYear(),
  tagline: '',
  status: 'plan',
};

export default function CreateMovieForm({ onClose }: CreateMovieForm) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMovie,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      onClose();
    },
  });

  function handleSubmit(values: FormValues, formikHelpers: FormikHelpers<FormValues>) {
    const payload: NewMovie = {
      title: values.title.trim(),
      tagline: values.tagline,
      status: values.status,
    };
    if (String(values.releaseYear).trim() !== '') {
      payload.releaseYear = Number(values.releaseYear);
    }

    mutation.mutate(payload, {
      onSuccess: () => formikHelpers.resetForm(),
    });
  }

  return (
    <Formik initialValues={initialValues} validationSchema={movieSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <h2 className={css.heading}>Create Movie</h2>

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
            {mutation.isPending ? 'Creating' : 'Create'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
