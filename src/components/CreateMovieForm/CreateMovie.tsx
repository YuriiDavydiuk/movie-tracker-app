// styles
import css from './CreateMovie.module.css';

// libraries
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

// components
import { createMovie } from '../../services/movieService';

interface CreateMovieForm {
  onClose: () => void;
}

interface FormValues {
  title: string;
  releaseYear: number;
  tagline: string;
  status: 'plan' | 'watching' | 'watched';
}

const initialValues: FormValues = {
  title: '',
  releaseYear: 2026,
  tagline: '',
  status: 'plan',
};

const CreateFormSchema = Yup.object().shape({
  title: Yup.string().trim().min(1).required('Title is required'),
  releaseYear: Yup.number(),
  tagline: Yup.string(),
  status: Yup.string().oneOf(['plan', 'watching', 'watched']).required(),
});

export default function CreateMovieForm({ onClose }: CreateMovieForm) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMovie,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      onClose();
    },
  });

  function handleSubmit(values: FormValues, FormilHelpers: FormikHelpers<FormValues>) {
    mutation.mutate(values, {
      onSuccess: () => FormilHelpers.resetForm(),
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateFormSchema}
      onSubmit={handleSubmit}
    >
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
