import css from './AlertMessage.module.css';

interface AlertMessageProps {
  message: string;
  className?: string;
}

export default function AlertMessage({ message, className }: AlertMessageProps) {
  const classes = className ? `${css.alert} ${className}` : css.alert;

  return (
    <p className={classes} role="alert">
      {message}
    </p>
  );
}
