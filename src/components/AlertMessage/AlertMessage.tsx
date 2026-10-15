interface AlertMessageProps {
  message: string;
  className?: string;
}

export default function AlertMessage({ message, className }: AlertMessageProps) {
  const classes = `alert alert-danger small mb-0 text-break ${className ?? ''}`;

  return (
    <p className={classes} role="alert">
      {message}
    </p>
  );
}
