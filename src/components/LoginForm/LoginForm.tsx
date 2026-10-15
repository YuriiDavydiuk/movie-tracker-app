import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
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
      <Form className="d-flex flex-column gap-3" noValidate>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="form-control"
          />
          <ErrorMessage
            name="email"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="form-control"
          />
          <ErrorMessage
            name="password"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'login')} />
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </Form>
    </Formik>
  );
}
