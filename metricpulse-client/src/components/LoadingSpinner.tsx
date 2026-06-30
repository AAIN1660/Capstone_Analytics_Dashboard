interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = 'Loading data…' }: LoadingSpinnerProps) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
