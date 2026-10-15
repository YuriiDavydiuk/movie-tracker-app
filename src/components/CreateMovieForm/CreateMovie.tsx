// libraries
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { movieSchema } from '../../validation/movieSchema';
import type { NewMovie } from '../../types/movie';

// components
import { createMovie } from '../../services/movieService';
import { getMovieErrorMessage } from '../../utils/getMovieErrorMessage';
import AlertMessage from '../AlertMessage/AlertMessage';

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
      <Form className="d-flex flex-column gap-3">
        <h2 className="h5 fw-bold mb-0">Create Movie</h2>

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
          <AlertMessage message={getMovieErrorMessage(mutation.error, 'create')} />
        )}
        <div className="d-flex flex-column flex-sm-row justify-content-sm-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating' : 'Create'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
