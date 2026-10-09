import * as Yup from 'yup';

export const movieSchema = Yup.object().shape({
  title: Yup.string().trim().min(1).max(100).required('Title is required'),
  releaseYear: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Release year must be a number')
    .integer('Release year must be an integer')
    .min(1888, 'Release year cannot be earlier than 1888')
    .max(new Date().getFullYear() + 1, 'Release year cannot be later than next year'),
  tagline: Yup.string(),
  status: Yup.string().oneOf(['plan', 'watching', 'watched']).required('Status is required'),
});
