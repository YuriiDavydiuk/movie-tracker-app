import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';

import css from './EditMovieForm.module.css';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Movie } from '../../types/movie';
import { updateMovie } from '../../services/movieService';

const ValidationEditMovieFormSchema = Yup.object().shape({
  title: Yup.string().trim().min(1).required('Title is required'),
  releaseYear: Yup.number(),
  tagline: Yup.string(),
  status: Yup.string().oneOf(['plan', 'watching', 'watched']).required(),
});

interface EditMovieFormProps {
  movie: Movie;
  onClose: () => void;
}

export default function EditMovieForm({ movie, onClose }: EditMovieFormProps) {
  interface FormData {
    _id: string;
    title?: string;
    releaseYear?: number;
    tagline?: string;
    status?: 'plan' | 'watching' | 'watched';
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      onClose();
    },
  });

  const handleSubmit = (values: FormData, actions: FormikHelpers<FormData>) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={movie}
      validationSchema={ValidationEditMovieFormSchema}
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

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
}
