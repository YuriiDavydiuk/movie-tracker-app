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
  const inputClasses =
    'min-h-10 w-full min-w-0 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600';

  const errorClasses = 'mt-1 block text-xs text-red-600 wrap-anywhere';
  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
          />
          <ErrorMessage name="email" component="span" className={errorClasses} />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900">
            Password
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={inputClasses}
          />
          <ErrorMessage name="password" component="span" className={errorClasses} />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'login')} />
        )}

        <button
          type="submit"
          className="min-h-10 w-full cursor-pointer rounded bg-blue-600 px-4 py-2 text-base text-white transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </Form>
    </Formik>
  );
}
