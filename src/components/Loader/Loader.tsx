import css from './Loader.module.css';

export default function Loader() {
  return (
    <div
      className={`${css.text} alert alert-info d-flex align-items-center justify-content-center gap-2 w-100 mx-auto my-4`}
      role="status"
    >
      <span className="spinner-border spinner-border-sm flex-shrink-0" aria-hidden="true" />
      <span>Loading, please wait...</span>
    </div>
  );
}
