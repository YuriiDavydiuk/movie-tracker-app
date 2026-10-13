import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from '../../styles/MovieForm.module.css';
import authCss from '../../styles/AuthPage.module.css';
import { login } from '../../services/authService';
import { AUTH_QUERY_KEY } from '../../context/AuthContext/context';
import { loginSchema, type LoginFormValues } from '../../validation/authSchema';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import AlertMessage from '../AlertMessage/AlertMessage';
import { useAuth } from '../../context/AuthContext/useAuth';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const { clearSessionExpired } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: user => {
      clearSessionExpired();
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    mutation.mutate({ email: values.email.trim(), password: values.password });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            className={css.input}
          />
          <ErrorMessage name="password" component="span" className={css.error} />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'login')} />
        )}

        <button
          type="submit"
          className={`${css.submitButton} ${authCss.submit}`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </Form>
    </Formik>
  );
}
