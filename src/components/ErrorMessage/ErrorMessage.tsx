import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <p className={`${css.text} alert alert-danger text-center w-100 mx-auto my-4`} role="alert">
      There was an error, please try again...
    </p>
  );
}
