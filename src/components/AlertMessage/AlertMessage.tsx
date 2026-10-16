interface AlertMessageProps {
  message: string;
  className?: string;
}

export default function AlertMessage({ message, className }: AlertMessageProps) {
  const classes = `rounded border border-red-200 border-l-4 border-l-red-600 bg-red-50 px-3 py-2 text-sm leading-snug text-red-800 wrap-anywhere ${className ?? ''}`;

  return (
    <p className={classes} role="alert">
      {message}
    </p>
  );
}
