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
  const inputClasses =
    'min-h-10 w-full min-w-0 rounded border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600';

  const errorClasses = 'mt-1 block text-xs text-red-600 wrap-anywhere';
  return (
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
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
            autoComplete="new-password"
            className={inputClasses}
          />
          <ErrorMessage name="password" component="span" className={errorClasses} />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <ErrorMessage name="confirmPassword" component="span" className={errorClasses} />
        </div>

        {mutation.isError && (
          <AlertMessage message={getAuthErrorMessage(mutation.error, 'register')} />
        )}

        <button
          type="submit"
          className="min-h-10 w-full cursor-pointer rounded bg-blue-600 px-4 py-2 text-base text-white transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating account...' : 'Sign up'}
        </button>
      </Form>
    </Formik>
  );
}
