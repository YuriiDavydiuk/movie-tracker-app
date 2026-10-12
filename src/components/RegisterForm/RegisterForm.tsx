import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from '../../styles/MovieForm.module.css';
import authCss from '../../styles/AuthPage.module.css';
import { login, register } from '../../services/authService';
import { AUTH_QUERY_KEY } from '../../context/AuthContext/context';
import { registerSchema, type RegisterFormValues } from '../../validation/authSchema';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import type { AuthCredentials } from '../../types/auth';
import AlertMessage from '../AlertMessage/AlertMessage';

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

async function registerAndLogin(credentials: AuthCredentials) {
  await register(credentials);
  return login(credentials);
}

export default function RegisterForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerAndLogin,
    onSuccess: user => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    mutation.mutate({ email: values.email.trim(), password: values.password });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
      <Form className={css.form} noValidate>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" autoComplete="email" className={css.input} />
          <ErrorMessage name="email" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className={css.input}
          />
          <ErrorMessage name="password" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={css.input}
          />
          <ErrorMessage name="confirmPassword" component="span" className={css.error} />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'register')} />
        )}

        <button
          type="submit"
          className={`${css.submitButton} ${authCss.submit}`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating account...' : 'Sign up'}
        </button>
      </Form>
    </Formik>
  );
}
