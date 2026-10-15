import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { register } from '../../services/authService';
import { AUTH_QUERY_KEY } from '../../context/AuthContext/context';
import { registerSchema, type RegisterFormValues } from '../../validation/authSchema';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import { useAuth } from '../../context/AuthContext/useAuth';

import AlertMessage from '../AlertMessage/AlertMessage';

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm() {
  const { clearSessionExpired } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: user => {
      clearSessionExpired();
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    mutation.mutate({ email: values.email.trim(), password: values.password });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
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
            autoComplete="new-password"
            className="form-control"
          />
          <ErrorMessage
            name="password"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="form-control"
          />
          <ErrorMessage
            name="confirmPassword"
            component="span"
            className="small text-danger d-block mt-1 text-break"
          />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'register')} />
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating account...' : 'Sign up'}
        </button>
      </Form>
    </Formik>
  );
}
