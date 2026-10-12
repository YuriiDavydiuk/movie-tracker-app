import * as Yup from 'yup';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 64;

const email = Yup.string().trim().email('Enter a valid email').required('Email is required');

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required('Password is required'),
});

export const registerSchema = Yup.object({
  email,
  password: Yup.string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(PASSWORD_MAX_LENGTH, `Password must be at most ${PASSWORD_MAX_LENGTH} characters`)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
export type RegisterFormValues = Yup.InferType<typeof registerSchema>;
